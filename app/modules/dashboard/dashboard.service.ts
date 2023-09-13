import { json } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';

export async function getBankList(storeId: string) {
  return json(
    await db.bankAccount.findMany({
      where: {
        storeId: '18',
      },
      include: {
        withdraw: true,
      },
    })
  );
}

export async function getStore() {
  return json(await db.store.findMany());
}

export async function deleteBankList(id: string) {
  // Unlink related records in the 'withdraw' table
  await db.withdraw.updateMany({
    where: { bankId: id },
    data: { bankId: null || undefined },
  });

  // Now you can safely delete the 'bankAccount' record
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
  const createdBank = await db.bankAccount.create({
    data: {
      store: {
        connect: { id: '18' },
      },
      accountName: data.accountName,
      bank: data.bank,
      accountNumber: data.accountNumber,
    },
  });
  console.log('Bank created:', createdBank);
  return createdBank;
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

export async function getWithdrawData() {
  return json(await db.withdraw.findMany());
}

export async function createWithdraw(
  data: any,
  bankId: string,
  storeId: string,
  approvedById: string
) {
  const amount = parseFloat(data.amount);
  const withdraw = await db.withdraw.create({
    data: {
      store: {
        connect: { id: '18' },
      },
      amount: amount,
      status: 'REQUEST',
      bankAccount: {
        connect: { id: '10' },
      },
      approvedBy: {
        connect: { id: '10' },
      },
    },
  });
  console.log('Withdraw created:', withdraw);
  return withdraw;
}

export async function deleteWithdraw(id: string) {
  return await db.withdraw.delete({
    where: { id: id },
  });
}
