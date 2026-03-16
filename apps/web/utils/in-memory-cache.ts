
interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export function createMemoryCache<T>(ttlMs: number) {
  let cache: CacheEntry<T> | null = null;

  return {
    get: (): T | null => {
      if (!cache || Date.now() > cache.expiresAt) return null;
      return cache.data;
    },
    set: (data: T) => {
      cache = { data, expiresAt: Date.now() + ttlMs };
    },
  };
}