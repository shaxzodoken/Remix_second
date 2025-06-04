import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const globalWithPrisma = global as typeof global & {
  __db?: PrismaClient;
};

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!globalWithPrisma.__db) {
    globalWithPrisma.__db = new PrismaClient();
  }
  prisma = globalWithPrisma.__db;
}

export { prisma };
