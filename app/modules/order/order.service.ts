import type { z } from 'zod';
import type { MootaOrderSchema } from './order.schema';
import { db } from '~/libs/prisma/db.server';

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
      await db.invoiceHistory.create({
        data: {
          status: 'PAID',
          invoiceId: relatedInvoice.id,
        },
      });
    }

    console.log('Paid Payment ,Good Luck Brother :)!');
  }
}
