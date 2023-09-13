import { db } from '~/libs/prisma/db.server';

export async function getPosts() {
  return await db.payment.findMany({
    where: {},
  });
}

export async function create(data: any) {
  const title = await db.payment.create({
    data: data.title,
  });
  return title;
}
