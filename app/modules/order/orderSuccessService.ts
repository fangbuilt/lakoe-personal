import { db } from '~/libs/prisma/db.server';

export default async function SuccesService() {
  return await db.invoice.findMany({
    where: {
      status: 'ORDER_COMPLETED',
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

export async function templateMessage() {
  return await db.messageTemplate.findMany({});
}
