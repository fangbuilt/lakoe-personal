import { json } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';

export async function getStoreData(id: string) {
  return json(
    await db.store.findMany({
      where: {
        id: '50',
      },
      include: {
        bankAccount: {
          include: {
            withdraw: true,
          },
        },
      },
    })
  );
}

export async function getBankList(storeId: string) {
  return json(
    await db.bankAccount.findMany({
      where: {
        storeId: '50',
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
        connect: { id: '50' },
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
  id: any,
  storeId: string,
  approvedById: string
) {
  try {
    const amount = parseFloat(data.amount);

    const user = await db.user.findUnique({
      where: { id: '50' },
    });

    if (!user) {
      throw new Error('User with id not found.');
    }

    const bankAccount = await db.bankAccount.findUnique({
      where: {
        id: id,
      },
    });

    if (!bankAccount) {
      throw new Error('Bank Account Id not found.');
    }

    const bankId = bankAccount.id;

    const withdraw = await db.withdraw.create({
      data: {
        store: {
          connect: { id: '50' },
        },
        amount: amount,
        status: 'REQUEST',
        bankAccount: {
          connect: { id: bankId },
        },
        approvedBy: {
          connect: { id: '1' },
        },
      },
    });

    // console.log("Withdraw created:", withdraw);
    return withdraw;
  } catch (error) {
    console.error('Error creating withdrawal:', error);
    throw error;
  }
}

export async function deleteWithdraw(id: string) {
  return await db.withdraw.delete({
    where: { id: id },
  });
}

// withdrawal logic
// export async function createWithdrawal(
//   storeId: string,
//   amount: number
// ): Promise<boolean> {
//   try {
//     const store = await db.store.findFirst({
//       where: {
//         id: "18",
//       },
//     });

//     if (store.credit >= amount) {
//       const newCredit = store.credit - amount;

//       await db.store.update({
//         where: {
//           id: "18",
//         },
//         data: {
//           credit: newCredit,
//         },
//       });
//       return true;
//     } else {
//       return false;
//     }
//   } catch (error) {
//     console.error("Withdrawal error:", error);
//     return false;
//   }
// }
