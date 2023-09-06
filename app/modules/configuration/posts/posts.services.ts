import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getPosts() {
  return await prisma.user.findMany({
    orderBy: {
      id: 'desc',
    },
  });
}

// export async function createPost(data: z.infer<typeof createConfiguration>) {
//   return await prisma.user.create({  });
// }
