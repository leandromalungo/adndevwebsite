import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Constantes da rota admin (server-only neste arquivo)
const ADMIN_GATE = "x";
const ADMIN_LAYER_ONE = "a9K3mP7xQ2vR";
const ADMIN_LAYER_TWO = "b4N8tL1cW6zD";
const ADMIN_INTERNAL_SEGMENT = "k7M2pQ9xL4nT";
const ADMIN_INTERNAL_REWRITE_TOKEN = "__admin_rewrite";
const ADMIN_PUBLIC_PREFIX = `/${ADMIN_GATE}/${ADMIN_LAYER_ONE}/${ADMIN_LAYER_TWO}`;
const ADMIN_INTERNAL_PREFIX = `/${ADMIN_INTERNAL_SEGMENT}`;

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const apiRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, '10 m'),
  analytics: true,
});

const uploadRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 h'),
  analytics: true,
});

const authRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '15 m'),
  analytics: true,
});

function getRequestIp(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const ip = getRequestIp(request);

  if (pathname.startsWith(ADMIN_PUBLIC_PREFIX)) {
    const suffix = pathname.slice(ADMIN_PUBLIC_PREFIX.length);
    const internalPath = suffix ? `${ADMIN_INTERNAL_PREFIX}${suffix}` : ADMIN_INTERNAL_PREFIX;
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = internalPath;
    rewriteUrl.searchParams.set(ADMIN_INTERNAL_REWRITE_TOKEN, "1");
    return NextResponse.rewrite(rewriteUrl);
  }

  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = "/404";
    return NextResponse.rewrite(notFoundUrl);
  }

  if (pathname === ADMIN_INTERNAL_PREFIX || pathname.startsWith(`${ADMIN_INTERNAL_PREFIX}/`)) {
    if (request.nextUrl.searchParams.get(ADMIN_INTERNAL_REWRITE_TOKEN) === "1") {
      return NextResponse.next();
    }
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = "/404";
    return NextResponse.rewrite(notFoundUrl);
  }

  if (pathname.startsWith('/api/upload')) {
    const { success } = await uploadRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many uploads' }, { status: 429 });
    }
  }

  if (pathname.startsWith('/api/auth/register') || pathname.startsWith('/api/auth/login')) {
    const { success } = await authRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many attempts' }, { status: 429 });
    }
  }

  if (pathname.startsWith('/api/')) {
    const { success } = await apiRateLimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*',
    '/admin',
    '/admin/:path*',
    '/k7M2pQ9xL4nT',
    '/k7M2pQ9xL4nT/:path*',
    '/x/a9K3mP7xQ2vR/b4N8tL1cW6zD',
    '/x/a9K3mP7xQ2vR/b4N8tL1cW6zD/:path*',
  ],
};