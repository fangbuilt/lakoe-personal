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
