import { createClient, RedisClientType } from 'redis';

const DEFAULT_TTL = 1000 * 60 * 60 * 24;

interface CacheEntry {
  value: any;
  expiry: number;
}
export class ExpiringCache {
  private static instance: ExpiringCache;
  private cache: RedisClientType;

  private constructor() {
    this.cache = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD || '',
    socket: {
        host: process.env.REDIS_URL || '',
        port: Number(process.env.REDIS_PORT || 14694)
    }
});
this.cache.on('error', (err) => console.error('Redis Client Error', err));
  }
   public static async getInstance(): Promise<ExpiringCache> {
    if (!ExpiringCache.instance) {
      ExpiringCache.instance = new ExpiringCache();
      await ExpiringCache.instance.cache.connect();
    }
    return ExpiringCache.instance;
  }
  public async set(key: string, value: any, ttl_ms: number = DEFAULT_TTL): Promise<void> {
    await this.cache.set(key,JSON.stringify(value),{PX:ttl_ms});
  }
  public async get(key: string):Promise<any|undefined>  {
    const value = await this.cache.get(key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
  public async delete(key: string): Promise<boolean> {
    const value = await this.cache.del(key);
    return value > 0;
  }
  public async clear(): Promise<void> {
    await this.cache.flushDb();
  }
}
