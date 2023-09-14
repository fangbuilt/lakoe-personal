import { db } from '~/libs/prisma/db.server';

export async function getPosts() {
  return await db.confirmationPayment.findMany({
    where: {},
  });
}

export async function createaPayment(data: any) {
  console.log(data);
  await db.confirmationPayment.create({ data });

  return data;
}
