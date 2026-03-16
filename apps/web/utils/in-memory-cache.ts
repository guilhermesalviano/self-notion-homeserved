interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

/**
 * Volatility: The cache is lost on every server restart
 * Single instance only: If you ever scale to multiple Node.js processes
 * @param ttlMs 
 * @returns T
 */
export function createMemoryCache<T>(ttlMs: number) {
  let cache: CacheEntry<T> | null = null;

  return {
    get: (): T | null => {
      if (!cache) return null;

      if (Date.now() > cache.expiresAt) {
        cache = null;
        return null;
      }

      return cache.data;
    },
    set: (data: T) => {
      cache = { data, expiresAt: Date.now() + ttlMs };
    },
  };
}