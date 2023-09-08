import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function getProductUnpid() {
  const cartItem = await prisma.cartItem.findMany();
  return cartItem;
}
