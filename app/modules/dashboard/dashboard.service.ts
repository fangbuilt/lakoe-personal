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

export async function createBank(data: any) {
  const dataPost = await db.bank_list.create({
    data: {
      name: data.name,
      bank_name: data.bank_name,
      bank_number: data.bank_number,
    },
  });
  return dataPost;
}

export async function updateBank(
  Id: number,
  updatedName: string,
  updateBankName: string,
  updateBankNumber: string
) {
  try {
    const updatedBank = await db.bank_list.update({
      where: {
        id: Id,
      },
      data: {
        name: updatedName,
        bank_name: updateBankName,
        bank_number: updateBankNumber,
      },
    });
    return updatedBank;
  } catch (error) {
    console.error('error updating', error);
    throw error;
  }
}
