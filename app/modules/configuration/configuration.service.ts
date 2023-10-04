import type { z } from 'zod';
import type { updateMessageSchema } from './configuration.schema';
import { db } from '~/libs/prisma/db.server';

export default async function createLocation(data: any) {
  try {
    const location = await db.location.create({
      data: {
        store: {
          connect: { id: '4' },
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

export async function deleteLocation(id: any) {
  return await db.location.delete({
    where: { id },
  });
}

export async function updateLocation(id: any, data: any) {
  try {
    const updateLocation = await db.location.update({
      where: { id: id },
      data: {
        store: {
          connect: { id: '4' },
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

    return updateLocation;
  } catch (error) {
    console.log('error service', error);
  }
}

// export async function updateMain(id: any, data: any) {
//   try {
//     const updateMain = await db.location.update({
//       where: { id: id },
//       data: {
//         isMainLocation: data.isMainLocation,
//       },
//     });
//     const getMain = await db.location.findMany({
//       where: { NOT: { id: id } },
//     });
//     const updateNotMain = await db.location.updateMany({
//       where: { NOT: { id: id } },
//       data: {
//         isMainLocation: data.isMainLocation,
//       },
//     });

//     return { updateMain, getMain, updateNotMain };
//   } catch (error) {
//     console.log("error service", error);
//   }
// }

export async function getAllDataLocation() {
  return await db.location.findMany({
    orderBy: {
      createdAt: 'asc',
    },
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

export async function createMessage(name: any, id: any, content: any) {
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
