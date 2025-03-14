import { PrismaClient } from '@prisma/client';

// Create a new Prisma client instance
const prisma = new PrismaClient();

// Define the context type
export type Context = {
  prisma: PrismaClient;
};

// Create the context for Apollo Server
export async function createContext(): Promise<Context> {
  return {
    prisma,
  };
}
