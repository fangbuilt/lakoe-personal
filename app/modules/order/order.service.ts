import { db } from '~/libs/prisma/db.server';

export async function GetDataProductReadyToShip() {
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
                  attachment: true,
                },
              },
            },
          },
        },
      },
    },
  });
}
