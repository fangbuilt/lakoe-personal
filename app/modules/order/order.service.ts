import { db } from '~/libs/prisma/db.server';

export async function getInvoiceByStatus(status: string) {
  const getorderdataforbiteship = await db.invoice.findMany({
    where: {
      status,
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
              product: {
                include: {
                  attachments: true,
                  cartItems: true,
                  variants: {
                    include: {
                      variantOptions: {
                        include: {
                          variantOptionValues: {
                            include: {
                              size: true,
                            },
                          },
                        },
                      },
                    },
                  },
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
