import { db } from '~/libs/prisma/db.server';

export async function getInvoiceByStatus() {
  const getorderdataforbiteship = await db.invoice.findMany({
    where: {
      status: 'NEW_ORDER',
    },
    include: {
      courier: true,
      cart: {
        include: {
          store: {
            include: {
              users: true,
              locations: true,
            },
          },
          cartItems: {
            include: {
              product: true,
              variantOption: {
                include: {
                  variantOptionValues: true,
                },
              },
            },
          },
        },
      },
    },
  });
  return getorderdataforbiteship;
}
