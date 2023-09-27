import type { z } from 'zod';
import type { updateMessageSchema } from './configuration.schema';
import { db } from '~/libs/prisma/db.server';

export async function getMessages() {
  return await db.messageTemplate.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getStoreId(id: any) {
  return await db.store.findUnique({
    where: {
      id,
    },
  });
}

export async function createMessage(name: any, id: any, content: any) {
  console.log(id);
  return await db.messageTemplate.create({
    data: { name: name, content: content, storeId: id },
  });
}

export async function updateMessage(data: z.infer<typeof updateMessageSchema>) {
  const updateMessage = await db.messageTemplate.update({
    where: { id: data.id },
    data,
  });

  return updateMessage;
}

export async function deleteMessage(id: any) {
  return await db.messageTemplate.delete({
    where: { id },
  });
}
