import type { z } from 'zod';
import type { createTMessageSchema } from './TMessage.schema';
import { PrismaClient } from '@prisma/client';

// export async function getTMessage(data: z.infer<typeof createTMessageSchema>) {
//   const title = await Prisma.messageTemplate.findMany({
//     where: {
//       id: data.findMany,
//     },
//   });
//   return title;

// }
const prisma = new PrismaClient();

export async function createTMessage(
  data: z.infer<typeof createTMessageSchema>
) {
  const title = await prisma.messageTemplate.create({
    data: {
      name: 'Template 1',
      content: 'Terimksih sudah belanja[]',
    },
  });
  return title;
}
