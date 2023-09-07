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
      accountName: data.accountName,
      bank: data.bank,
      accountNumber: data.accountNumber,
    },
  });
  return dataPost;
}

export async function updateBank(
  Id: string,
  updateAccountName: string,
  updateBankName: string,
  updateAccountNumber: string
) {
  try {
    const updatedBank = await db.bankAccount.update({
      where: {
        id: Id,
      },
      data: {
        accountName: updateAccountName,
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
