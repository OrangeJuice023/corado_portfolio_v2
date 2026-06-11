/**
 * In-memory fixed-window rate limiter. Fine for a portfolio / single
 * instance. For strict global limits on serverless, swap for Upstash Redis.
 */
type Bucket = { count: number; reset: number };

const buckets = new Map<string, Bucket>();

export function rateLimit(
  key: string,
  limit = 15,
  windowMs = 60_000,
): { success: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now > bucket.reset) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { success: true, remaining: limit - 1, reset: now + windowMs };
  }
  if (bucket.count >= limit) {
    return { success: false, remaining: 0, reset: bucket.reset };
  }
  bucket.count += 1;
  return { success: true, remaining: limit - bucket.count, reset: bucket.reset };
}

/** Best-effort client IP from common proxy headers. */
export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "anonymous";
}
