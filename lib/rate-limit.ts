import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimit instance
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Rate limiter for login attempts: 3 attempts per 5 minutes per IP (reduced from 5)
export const loginRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "5 m"), // Reduced from 5 to 3
  analytics: true,
});

// Rate limiter for sign-up attempts: 1 attempt per 2 minutes per IP
export const signUpRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "2 m"),
  analytics: true,
});

// Rate limiter for account creation: 1 attempt per 2 minutes per IP
export const accountCreationRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(1, "2 m"),
  analytics: true,
});

// Rate limiter for verification email resend: 3 attempts per 15 minutes
export const emailVerificationResendRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "15 m"),
  analytics: true,
});

// Rate limiter for first verification email send: 3 attempts per 15 minutes
export const emailVerificationSendRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "15 m"),
  analytics: true,
});

// Rate limiter for profile sharing via email: 5 attempts per hour per user
export const profileShareRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 h"),
  analytics: true,
});

// Rate limiter for password reset requests: 3 attempts per 15 minutes
export const passwordResetRequestRateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(3, "15 m"),
  analytics: true,
});

// Progressive blocking system for failed login attempts
interface LoginAttemptData {
  count: number;
  lastAttempt: number;
  blockedUntil?: number;
}

const LOGIN_ATTEMPT_KEY_PREFIX = "login_attempts:";
const MAX_ATTEMPTS = 3;
const BLOCK_DURATIONS = {
  1: 5 * 60 * 1000,     // 5 minutes after 3 attempts
  2: 15 * 60 * 1000,    // 15 minutes after 6 attempts
  3: 60 * 60 * 1000,    // 1 hour after 9 attempts
  4: 24 * 60 * 60 * 1000, // 24 hours after 12 attempts (permanent block)
};

/**
 * Check and update login attempt tracking with progressive blocking
 */
export async function checkLoginAttempts(identifier: string): Promise<{
  allowed: boolean;
  remainingAttempts: number;
  blockedUntil?: number;
  message?: string;
}> {
  const key = `${LOGIN_ATTEMPT_KEY_PREFIX}${identifier}`;
  const now = Date.now();

  try {
    const data = await redis.get(key);
    const attempts: LoginAttemptData =
      typeof data === "string"
        ? JSON.parse(data)
        : (data as LoginAttemptData | null) || { count: 0, lastAttempt: now };

    // Check if currently blocked
    if (attempts.blockedUntil && now < attempts.blockedUntil) {
      return {
        allowed: false,
        remainingAttempts: 0,
        blockedUntil: attempts.blockedUntil,
        message: `Conta temporariamente bloqueada. Tente novamente em ${Math.ceil((attempts.blockedUntil - now) / 60000)} minutos.`
      };
    }

    // Se o bloqueio já expirou, libera imediatamente novas tentativas
    if (attempts.blockedUntil && now >= attempts.blockedUntil) {
      attempts.count = 0;
      delete attempts.blockedUntil;
      attempts.lastAttempt = now;
      await redis.setex(key, 7 * 24 * 60 * 60, JSON.stringify(attempts));
    }

    // Reset counter if enough time has passed (successful login window)
    if (attempts.count > 0 && now - attempts.lastAttempt > 24 * 60 * 60 * 1000) {
      attempts.count = 0;
      delete attempts.blockedUntil;
    }

    const remaining = Math.max(0, MAX_ATTEMPTS - attempts.count);

    return {
      allowed: remaining > 0,
      remainingAttempts: remaining,
      message: remaining === 0 ? "Limite de tentativas excedido. Conta bloqueada temporariamente." : undefined
    };
  } catch (error) {
    // Allow login on error to avoid blocking legitimate users
    return { allowed: true, remainingAttempts: MAX_ATTEMPTS };
  }
}

/**
 * Record a failed login attempt and apply progressive blocking
 */
export async function recordFailedLogin(identifier: string): Promise<void> {
  const key = `${LOGIN_ATTEMPT_KEY_PREFIX}${identifier}`;
  const now = Date.now();

  try {
    const data = await redis.get(key);
    const attempts: LoginAttemptData =
      typeof data === "string"
        ? JSON.parse(data)
        : (data as LoginAttemptData | null) || { count: 0, lastAttempt: now };

    attempts.count += 1;
    attempts.lastAttempt = now;

    // Apply progressive blocking based on attempt count
    const blockLevel = Math.floor((attempts.count - MAX_ATTEMPTS) / MAX_ATTEMPTS) + 1;
    if (blockLevel > 0 && BLOCK_DURATIONS[blockLevel as keyof typeof BLOCK_DURATIONS]) {
      attempts.blockedUntil = now + BLOCK_DURATIONS[blockLevel as keyof typeof BLOCK_DURATIONS];
    }

    // Store for 7 days to maintain block state
    await redis.setex(key, 7 * 24 * 60 * 60, JSON.stringify(attempts));
  } catch (error) {
  }
}

/**
 * Clear login attempts on successful login
 */
export async function clearLoginAttempts(identifier: string): Promise<void> {
  const key = `${LOGIN_ATTEMPT_KEY_PREFIX}${identifier}`;
  try {
    await redis.del(key);
  } catch (error) {
  }
}