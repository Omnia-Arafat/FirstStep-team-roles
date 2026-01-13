// Use require for @prisma/client to avoid TypeScript type resolution issues on CI before client is generated
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

type PrismaClientType = InstanceType<typeof PrismaClient>;
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

const createPrismaClient = () => {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

export const prisma: PrismaClientType = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
