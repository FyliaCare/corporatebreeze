/**
 * Simple in-memory cache with TTL support
 * For production, use Redis or similar distributed cache
 */

interface CacheEntry<T> {
  value: T
  expiresAt: number
}

class Cache {
  private store: Map<string, CacheEntry<any>> = new Map()
  private cleanupInterval: NodeJS.Timeout | null = null

  constructor() {
    // Clean up expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup()
    }, 5 * 60 * 1000)
  }

  /**
   * Get value from cache
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key)

    if (!entry) {
      return null
    }

    // Check if expired
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key)
      return null
    }

    return entry.value as T
  }

  /**
   * Set value in cache with TTL (in seconds)
   */
  set<T>(key: string, value: T, ttlSeconds: number = 300): void {
    const expiresAt = Date.now() + ttlSeconds * 1000
    this.store.set(key, { value, expiresAt })
  }

  /**
   * Delete specific key from cache
   */
  delete(key: string): void {
    this.store.delete(key)
  }

  /**
   * Delete all keys matching pattern
   */
  deletePattern(pattern: string): void {
    const regex = new RegExp(pattern.replace(/\*/g, '.*'))
    for (const key of this.store.keys()) {
      if (regex.test(key)) {
        this.store.delete(key)
      }
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.store.clear()
  }

  /**
   * Remove expired entries
   */
  private cleanup(): void {
    const now = Date.now()
    for (const [key, entry] of this.store.entries()) {
      if (now > entry.expiresAt) {
        this.store.delete(key)
      }
    }
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.store.size,
      keys: Array.from(this.store.keys()),
    }
  }

  /**
   * Cleanup interval on shutdown
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval)
      this.cleanupInterval = null
    }
  }
}

// Singleton instance
export const cache = new Cache()

/**
 * Cache key builders for consistent naming
 */
export const cacheKeys = {
  product: (id: string) => `product:${id}`,
  products: (filters?: string) => `products:${filters || 'all'}`,
  cart: (userId: string) => `cart:${userId}`,
  user: (id: string) => `user:${id}`,
  categories: () => 'categories:all',
  stats: () => 'admin:stats',
  orders: (userId: string) => `orders:${userId}`,
  order: (id: string) => `order:${id}`,
}

/**
 * Cache invalidation helpers
 */
export const invalidateCache = {
  product: (id?: string) => {
    if (id) {
      cache.delete(cacheKeys.product(id))
    }
    cache.deletePattern('products:*')
  },
  cart: (userId: string) => {
    cache.delete(cacheKeys.cart(userId))
  },
  user: (id: string) => {
    cache.delete(cacheKeys.user(id))
  },
  orders: (userId: string) => {
    cache.delete(cacheKeys.orders(userId))
    cache.deletePattern('order:*')
  },
  all: () => {
    cache.clear()
  },
}

/**
 * Helper function for caching async operations
 */
export async function withCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = 300
): Promise<T> {
  // Try to get from cache
  const cached = cache.get<T>(key)
  if (cached !== null) {
    return cached
  }

  // Fetch fresh data
  const data = await fetcher()

  // Store in cache
  cache.set(key, data, ttlSeconds)

  return data
}
