import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();

const globalWithDb = global as typeof global & {
  __db__?: PrismaClient;
};

const db: PrismaClient =
  globalWithDb.__db__ ?? (globalWithDb.__db__ = new PrismaClient());

export { db };
