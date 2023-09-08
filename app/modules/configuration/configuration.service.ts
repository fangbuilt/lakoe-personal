import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.user.findMany();
}

export async function createPost(data: any) {
  const title = await prisma.user.create({
    data: data.title,
  });
  return title;
}
