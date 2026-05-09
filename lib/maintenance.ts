import "server-only";
import { Redis } from "@upstash/redis";
import { cleanupExpiredTokens } from "@/lib/email-verification";

const TOKEN_CLEANUP_LAST_RUN_KEY = "maintenance:token_cleanup:last_run";
const DEFAULT_MIN_INTERVAL_SECONDS = 30 * 60; // 30 minutes

let memoryLastRunMs = 0;
let redisClient: Redis | null | undefined;

function getRedisClient(): Redis | null {
  if (redisClient !== undefined) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    redisClient = null;
    return redisClient;
  }

  redisClient = new Redis({ url, token });
  return redisClient;
}

export async function cleanupExpiredTokensIfDue(
  minIntervalSeconds = DEFAULT_MIN_INTERVAL_SECONDS
): Promise<{ ran: boolean; deletedTokens: number }> {
  const nowMs = Date.now();
  const minIntervalMs = Math.max(60, minIntervalSeconds) * 1000;
  const redis = getRedisClient();

  try {
    if (redis) {
      const rawLastRun = await redis.get(TOKEN_CLEANUP_LAST_RUN_KEY);
      const lastRunMs =
        typeof rawLastRun === "string" ? Number(rawLastRun) : Number(rawLastRun ?? 0);

      if (Number.isFinite(lastRunMs) && lastRunMs > 0 && nowMs - lastRunMs < minIntervalMs) {
        return { ran: false, deletedTokens: 0 };
      }
    } else if (memoryLastRunMs > 0 && nowMs - memoryLastRunMs < minIntervalMs) {
      return { ran: false, deletedTokens: 0 };
    }

    const deletedTokens = await cleanupExpiredTokens();
    memoryLastRunMs = nowMs;

    if (redis) {
      // Keep a long TTL so all instances share cooldown state.
      await redis.setex(TOKEN_CLEANUP_LAST_RUN_KEY, 7 * 24 * 60 * 60, String(nowMs));
    }

    return { ran: true, deletedTokens };
  } catch {
    // Fail-open: auth and reset flows must continue even on maintenance issues.
    return { ran: false, deletedTokens: 0 };
  }
}
