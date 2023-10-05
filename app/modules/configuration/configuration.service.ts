// import type { updateMessage } from '../configuration/configuration.schema';
import { db } from '~/libs/prisma/db.server';

export async function getStore(storeId: string | undefined) {
  if (typeof storeId === 'string') {
    const store = await db.store.findUnique({
      where: {
        id: storeId,
      },
    });

    return store;
  }
}

export async function getAllDataLocation() {
  return await db.location.findMany();
}

export async function deleteLocation(id: any) {
  return await db.location.delete({
    where: { id },
  });
}
//====================================================
export async function createStoreInformation(data: any) {
  const dataPost = await db.store.create({
    data: {
      name: data.name,
      slogan: data.slogan,
      description: data.description,
      domain: data.domain,
      logoAttachment: data.logoAttachment,
    },
  });
  return dataPost;
}

export async function updateStoreInformation(storeId: string, data: any) {
  const dataUpdate = await db.store.update({
    where: { id: storeId },
    data: {
      name: data.name,
      slogan: data.slogan,
      description: data.description,
      domain: data.domain,
      logoAttachment: data.logoAttachment,
    },
  });
  return dataUpdate;
}

//ini service template message=========================

export async function getMessages(id: any) {
  return await db.messageTemplate.findMany({
    where: {
      storeId: id,
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getStoreid(id: any) {
  // export async function login(data: z.infer<typeof checkoutSchema>) {}
  return await db.store.findFirst({
    where: {
      id,
    },
  });
}

export async function createMessage(name: any, id: any, content: any) {
  return await db.messageTemplate.create({
    data: { name: name, content: content, storeId: id },
  });
}

// export async function updateMessage(data: z.infer<typeof updateMessage>) {
//   const updateMessage = await db.messageTemplate.update({
//     where: { id: data.id },
//     data,
//   });

//   return updateMessage;
// }

export async function deleteMessage(id: any) {
  return await db.messageTemplate.delete({
    where: { id },
  });
}
