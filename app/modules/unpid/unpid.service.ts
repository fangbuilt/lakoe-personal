import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GetUnpid() {
  const unpid = await prisma.payment.findMany();
  return unpid;
}
export async function GetUnpidUsers() {
  const unpid = await prisma.user.findMany();
  return unpid;
}
