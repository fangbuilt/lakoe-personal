import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getTemplate() {
  const data = await prisma.messageTemplate.findMany({
    orderBy: {
      id: 'desc',
    },
  });

  console.log('ini semua data dari backend', data);
  return data;
}

// export async function createTemplate(data: z.infer<typeof createTamplate>) {
//   return await prisma.messageTemplate.create({});
// }
