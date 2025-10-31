import { PrismaClient } from '@prisma/client';

let prisma;

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis._prisma) {
    globalThis._prisma = new PrismaClient();
  }
  prisma = globalThis._prisma;
} else {
  prisma = new PrismaClient();
}

export default prisma;
