// import { z } from "zod";
import { db } from '~/libs/prisma/db.server';

export async function getMessages() {
  // export async function login(data: z.infer<typeof checkoutSchema>) {}
  return await db.messageTemplate.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function getStoreid(id: any) {
  // export async function login(data: z.infer<typeof checkoutSchema>) {}
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

export async function updateMessage(id: any, name: any, content: any) {
  const updateMessage = await db.messageTemplate.update({
    where: { id: id },
    data: { name, content },
  });

  return updateMessage;
}

export async function deleteMessage(id: any) {
  return await db.messageTemplate.delete({
    where: { id },
  });
}
