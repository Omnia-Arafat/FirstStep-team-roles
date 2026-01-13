// Use require for @prisma/client to avoid TypeScript type resolution issues on CI before client is generated
// eslint-disable-next-line @typescript-eslint/no-var-requires
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

let prismaSingleton: PrismaClient | undefined;

export function getPrisma(): PrismaClient {
  if (prismaSingleton) return prismaSingleton;

  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }

  const pool = new Pool({
    connectionString: url,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);

  prismaSingleton = new PrismaClient({ adapter, log: ['error'] });
  return prismaSingleton;
}
