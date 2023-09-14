// import { z } from "zod";
import { db } from '~/libs/prisma/db.server';
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient()

export async function getMessages() {
  // export async function login(data: z.infer<typeof checkoutSchema>) {}
  return await db.messageTemplate.findMany({
    orderBy: { id: 'asc' },
  });
}

export async function createMesage(data: any) {
  const message = await db.messageTemplate.create({
    data: data,
  });

  return message;
}

// export async function updateMesage(id: any, data: any) {
//   const updateMessage = await db.messageTemplate.update({
//       where : { id : id },
//       data: data
//   })

//   return updateMessage
// }

export async function updateMesage(id: any, name: any, content: any) {
  const updateMessage = await db.messageTemplate.update({
    where: { id: id },
    data: { name, content },
  });

  return updateMessage;
}

export async function deleteMesage(id: any) {
  return await db.messageTemplate.delete({
    where: { id },
  });
}
