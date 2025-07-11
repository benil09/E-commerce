import Redis from "ioredis"
import dotenv from "dotenv";
dotenv.config();


export const redis = new Redis(process.env.REDIS_URL);
await redis.set('foo', 'bar');

//console.log("Redis connection established and test key set:", await redis.get('foo'));
