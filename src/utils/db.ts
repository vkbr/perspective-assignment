import { PrismaClient } from '../db';

export const prismaClient = new PrismaClient({
  // log: ['query', 'info', 'warn', 'error'],
});
