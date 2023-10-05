import { db } from '~/libs/prisma/db.server';

// Fetching data store, bankAccount, withdraw
// export async function getStoreData(id: string) {
//   await db.store.findMany({
//     where: {
//       id: "1",
//     },
//     include: {
//       bankAccounts: {
//         include: {
//           withdraws: {
//             where: {
//               storeId: "1",
//             },
//           },
//         },
//       },
//     },
//   });
// }
export async function getStoreData(userId: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const storeId = user.storeId ?? '';

    const res = await db.store.findFirst({
      where: {
        id: storeId,
      },
      include: {
        bankAccounts: {
          include: {
            withdraws: {
              where: {
                storeId: storeId,
              },
            },
          },
        },
      },
    });

    if (!res) {
      throw new Error('Store not found');
    }

    return res;
  } catch (error) {
    throw error;
  } finally {
    await db.$disconnect(); // Close the database connection when done.
  }
}

//BankAccount CRUD
export async function getBankList(userId: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || !user.storeId) {
      throw new Error('User or store not found');
    }

    const result = await db.bankAccount.findMany({
      where: {
        storeId: user.storeId,
      },
    });

    // You can consider logging this information using a proper logger.
    // console.log("Result:", result);
    // console.log("User:", user);
    // console.log("Store ID:", user.storeId);

    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    await db.$disconnect(); // Close the database connection when done.
  }
}

export async function deleteBankList(id: string) {
  // Check if the bank account with the specified ID exists
  const existingBankAccount = await db.bankAccount.findUnique({
    where: { id: id },
  });

  if (!existingBankAccount) {
    throw new Error(`Bank account with ID ${id} does not exist.`);
  }

  // Update the related withdraw records to remove the reference to the bank
  await db.withdraw.updateMany({
    where: { bankId: id },
    data: { bankId: null || undefined },
  });

  // Delete the bank account
  await db.bankAccount.delete({
    where: { id: id },
  });

  return { success: true };
}

export async function getNameBank(bank: string) {
  return await db.bankAccount.findFirst({
    where: {
      bank: bank,
    },
  });
}

export async function createBank(data: any, userId: string) {
  const user = await db.user.findFirst({
    where: {
      id: userId,
    },
  });

  const createdBank = await db.bankAccount.create({
    data: {
      store: {
        connect: { id: user?.storeId ?? '' },
      },
      accountName: data.accountName,
      bank: data.bank,
      accountNumber: data.accountNumber,
    },
  });

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

export async function getWithdrawalList() {
  const withdrawalList = await db.withdraw.findMany({
    include: {
      store: true,
      bankAccount: true,
      attachmentWithdraw: true,
      adminDecline: true,
    },
  });
  return withdrawalList;
}

export async function updateStatusWithdraw(
  id: string,
  statusUpdated: string,
  dateUpdated?: string
) {
  try {
    const updatedStatus = await db.withdraw.update({
      where: {
        id: id,
      },
      data: {
        status: statusUpdated,
        updatedAt: dateUpdated,
      },
    });
    return updatedStatus;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}

export async function createWithdraw(
  data: any,
  id: any,
  storeId: string,
  approvedById: string,
  userId: string
) {
  try {
    const amount = parseFloat(data.amount);

    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user || !user.storeId) {
      throw new Error('User or store not found');
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

    const now = new Date();
    const withdraw = await db.withdraw.create({
      data: {
        store: {
          connect: { id: user?.storeId ?? '' },
        },
        amount: amount,
        status: 'REQUEST',
        // attachment: data.attachment,
        bankAccount: {
          connect: { id: bankId },
        },
        approvedBy: {
          connect: { id: user?.storeId ?? '' },
        },
        updatedAt: now,
      },
    });

    // console.log("ini user id", userId);
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

export async function createDeclinedReason(
  data: any,
  withdrawId: string,
  storeId: string,
  bankAccountId: string
) {
  const createReason = await db.adminDecline.create({
    data: {
      withdraw: {
        connect: {
          id: withdrawId,
        },
      },
      store: {
        connect: {
          id: storeId,
        },
      },
      bankAccount: {
        connect: {
          id: bankAccountId,
        },
      },
      reason: data.reason,
    },
  });

  return createReason;
}

export async function createAttachmentWithdraw(
  attachmentUrl: string,
  withdrawId: string
) {
  try {
    const createAttachment = await db.attachmentWithdraw.create({
      data: {
        withdraw: {
          connect: {
            id: withdrawId,
          },
        },
        attachment: attachmentUrl,
      },
    });

    // console.log("Attachment creation success:", createAttachment);

    return createAttachment;
  } catch (error) {
    console.error('Error creating attachment:', error);
    throw error;
  }
}

// adminDecline

export async function getReasonDeclined() {
  const reasonDeclinedList = await db.adminDecline.findMany({
    include: {
      store: true,
      withdraw: true,
      bankAccount: true,
    },
  });

  return reasonDeclinedList;
}

//REFUND
export async function getRefundData() {
  const refundData = await db.refund.findMany({
    include: {
      invoice: {
        include: {
          payment: true,
        },
      },
    },
  });

  return refundData;
}

export async function updateStatusRefund(
  id: string,
  statusUpdated: string,
  dateUpdated?: string
) {
  try {
    const updatedStatus = await db.refund.update({
      where: {
        id: id,
      },
      data: {
        status: statusUpdated,
        updatedAt: dateUpdated,
      },
    });
    return updatedStatus;
  } catch (error) {
    console.error('Error updating status:', error);
    throw error;
  }
}

//CreateAttachmentRefund
export async function createAttachmentRefund(
  attachmentUrl: string,
  refundId: string
) {
  try {
    const createAttachment = await db.attachmentRefund.create({
      data: {
        refund: {
          connect: {
            id: refundId,
          },
        },
        attachment: attachmentUrl,
      },
    });

    // console.log("Attachment creation success:", createAttachment);

    return createAttachment;
  } catch (error) {
    console.error('Error creating attachment:', error);
    throw error;
  }
}
