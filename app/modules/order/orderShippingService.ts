import { db } from '~/libs/prisma/db.server';

export default async function getDataInShipping() {
  return await db.invoice.findMany({
    where: {
      status: 'IN_TRANSIT',
    },
    include: {
      courier: true,
      cart: {
        include: {
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
