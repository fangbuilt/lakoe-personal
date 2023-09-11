import { db } from '~/libs/prisma/db.server';

export async function GetUnpid() {
  const datash = await db.payment.findMany({
    include: {
      user: true,
    },
  });
  return datash;
}
export async function GetUnpidUsers() {
  const unpid = await db.user.findMany();
  return unpid;
}
