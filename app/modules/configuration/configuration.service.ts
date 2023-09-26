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
