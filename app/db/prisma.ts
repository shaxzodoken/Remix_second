import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();


let db: PrismaClient;

declare global {
  var __db__: PrismaClient | undefined;
}

if (!global.__db__) {
  global.__db__ = new PrismaClient();
}
db = global.__db__;

export { db };
