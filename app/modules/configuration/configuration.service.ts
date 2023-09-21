import { json } from '@remix-run/node';
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
  return json(await db.location.findMany());
}
