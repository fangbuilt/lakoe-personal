import { db } from '~/libs/prisma/db.server';

export async function getDataProductReadyToShip() {
  return await db.invoice.findMany({
    where: {
      status: 'READY_TO_SHIP',
    },
    include: {
      courier: true,
      cart: {
        include: {
          user: true,
          cartItems: {
            include: {
              product: {
                include: {
                  attachments: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
