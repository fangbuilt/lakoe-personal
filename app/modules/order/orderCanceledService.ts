import { db } from '~/libs/prisma/db.server';

export default async function CanceledService() {
  return await db.invoice.findMany({
    where: {
      status: 'ORDER_CANCELLED',
    },
    include: {
      courier: true,
      user: true,
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
}

export async function ready() {
  return await db.invoice.findMany({
    where: {
      status: 'ORDER_CANCELLED',
    },
  });
}
