import type { z } from 'zod';
import type { MootaOrderSchema } from './order.schema';
import { db } from '~/libs/prisma/db.server';

export async function MootaOrderStatusUpdate(
  data: z.infer<typeof MootaOrderSchema>
) {
  const existingTransaction = await db.payment.findFirst({
    where: {
      amount: data.amount,
      status: 'UNPAID',
    },
  });

  if (existingTransaction) {
    await db.payment.update({
      where: {
        id: existingTransaction.id,
      },
      data: {
        status: 'PAID',
      },
    });

    const relatedInvoice = await db.invoice.findFirst({
      where: {
        paymentId: existingTransaction.id,
      },
    });
    if (relatedInvoice) {
      await db.invoice.update({
        where: {
          id: relatedInvoice.id,
        },
        data: {
          status: 'NEW_ORDER',
        },
      });
    }
    console.log('data berhasil ditambahkan');
  }
}
export async function getProductUnpid() {
  const payments = await db.invoice.findMany({
    where: {
      status: 'UNPAID',
    },
    include: {
      user: true,
      payment: true,
      cart: {
        include: {
          store: {
            include: {
              messageTemplates: true,
            },
          },
          cartItems: {
            include: {
              product: {
                include: {
                  attachments: true,
                  store: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return payments;
}

export async function getAllProductUnpid() {
  const payments = await db.invoice.findMany({
    include: {
      user: true,
      payment: true,
      courier: true,
      cart: {
        include: {
          store: {
            include: {
              messageTemplates: true,
            },
          },
          cartItems: {
            include: {
              product: {
                include: {
                  attachments: true,
                  // store: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return payments;
}
export async function getProductUnpid1() {
  const payments = await db.payment.findMany();
  console.log('getProductUnpid1getProductUnpid1', payments);
  return payments;
}

export async function getProductUnpid3() {
  try {
    const payments = await db.product.findMany({
      select: {
        name: true,
      },
    });

    return console.log('getProductUnpid2getProductUnpid2', payments);
  } catch (error) {
    throw new Error(`Failed to get unpaid products: ${error}`);
  }
}
