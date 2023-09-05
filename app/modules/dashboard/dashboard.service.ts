import { json } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';

export async function getBankList() {
  return json(await db.bank_list.findMany());
}

export async function deleteBankList(id: number) {
  return await db.bank_list.delete({
    where: { id: id },
  });
}

export async function getNameBank(bank_name: string) {
  return await db.bank_list.findFirst({
    where: {
      name: bank_name,
    },
  });
}
