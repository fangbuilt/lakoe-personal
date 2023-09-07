import { json } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';

export async function getBankList() {
  return json(await db.bankAccount.findMany());
}

export async function deleteBankList(id: string) {
  return await db.bankAccount.delete({
    where: { id: id },
  });
}

export async function getNameBank(bank: string) {
  return await db.bankAccount.findFirst({
    where: {
      bank: bank,
    },
  });
}

export async function createBank(data: any) {
  const dataPost = await db.bankAccount.create({
    data: {
      // store: data.store,
      bank: data.bank,
      accountNumber: parseInt(data.accountNumber),
    },
  });
  return dataPost;
}

export async function updateBank(
  Id: string,
  updateBankName: string,
  updateAccountNumber: number
) {
  try {
    const updatedBank = await db.bankAccount.update({
      where: {
        id: Id,
      },
      data: {
        bank: updateBankName,
        accountNumber: updateAccountNumber,
      },
    });
    return updatedBank;
  } catch (error) {
    console.error('error updating', error);
    throw error;
  }
}
