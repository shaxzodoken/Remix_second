import type { PrismaClient } from "@prisma/client";

declare global {
  let __db__: PrismaClient | undefined;
  let __db: PrismaClient | undefined;
}

export {};
