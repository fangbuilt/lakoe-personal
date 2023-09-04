import { db } from '~/libs/prisma/db.server';

export async function getBankList() {
  return await db.bank_list.findMany();
}

export async function deleteBankList(id: number) {
  return await db.bank_list.delete({
    where: { id: id },
  });
}
