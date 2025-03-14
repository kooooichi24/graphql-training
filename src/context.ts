import { PrismaClient } from '@prisma/client';

// Prismaクライアントのシングルトンインスタンスを作成
// これにより、複数のリクエストで同じインスタンスを再利用できます
let prisma: PrismaClient;

function getPrismaClient(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

// コンテキストの型定義
export type Context = {
  prisma: PrismaClient;
};

// Apollo Serverのコンテキスト作成関数
export async function createContext(): Promise<Context> {
  const prisma = getPrismaClient();

  return {
    prisma,
  };
}
