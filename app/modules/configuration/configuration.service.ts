import type { z } from 'zod';
import type {
  createMessageSchema,
  updateMessageSchema,
} from './configuration.schema';
import { db } from '~/libs/prisma/db.server';

export default async function createLocation(data: any) {
  try {
    const location = await db.location.create({
      data: {
        store: {
          connect: { id: '1' },
        },
        profile: {
          connect: { id: '1' },
        },
        name: data.name,
        address: data.address,
        latitude: data.latitude,
        longtitude: data.longtitude,
        cityDistrict: data.cityDistrict,
        postalCode: data.postalCode,
        isMainLocation: data.isMainLocation,
      },
    });

    return location;
  } catch (error) {
    console.log('error service', error);
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

export async function getStoreId(id: any) {
  return await db.store.findUnique({
    where: {
      id,
    },
  });
}

export async function createMessage(data: z.infer<typeof createMessageSchema>) {
  return await db.messageTemplate.create({
    data,
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
