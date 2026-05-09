import { NextRequest, NextResponse } from 'next/server';
import { cleanupExpiredTokens } from '@/lib/email-verification';

const MAINTENANCE_SECRET = process.env.MAINTENANCE_SECRET_TOKEN;
const CRON_SECRET = process.env.CRON_SECRET;

function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  if (CRON_SECRET && authHeader === `Bearer ${CRON_SECRET}`) {
    return true;
  }

  if (MAINTENANCE_SECRET && authHeader === `Bearer ${MAINTENANCE_SECRET}`) {
    return true;
  }

  return false;
}

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const deletedCount = await cleanupExpiredTokens();

    return NextResponse.json({
      success: true,
      deletedTokens: deletedCount,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Cleanup error.');
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return POST(request);
}