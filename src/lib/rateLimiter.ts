// src/lib/rateLimiter.ts

// keep last‐sent timestamp per user
const lastSent: Record<string, number> = {};
// minimum milliseconds between messages
const MIN_INTERVAL = 5000; // e.g. 5 seconds

/**
 * returns true if the user is spamming (i.e. sending too fast)
 */
export function isSpamming(userId: string): boolean {
  const now = Date.now();
  const prev = lastSent[userId] || 0;
  if (now - prev < MIN_INTERVAL) {
    return true;
  }
  lastSent[userId] = now;
  return false;
}
