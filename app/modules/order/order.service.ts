import { db } from '~/libs/prisma/db.server';

export async function getProductUnpid() {
  const payments = await db.cart.findMany({
    include: {
      store: true,
      user: true,
      cartItems: {
        include: {
          product: true,
          user: {
            include: {
              invoices: true,
              payments: true,
            },
          },
        },
      },
      invoice: true,
    },
  });
  return payments;
}

export async function getProductUnpid1() {
  const payments = await db.payment.findMany();
  console.log('getProductUnpid1getProductUnpid1', payments);
  return payments;
}
export async function getProductUnpid2() {
  try {
    const payments = await db.invoice.findMany({
      include: {
        user: {
          include: {
            payments: true,
          },
        },
        cart: {
          include: {
            user: {
              include: {
                cartItems: true,
                store: true,
              },
            },
          },
        },
      },
    });

    return console.log('getProductUnpid2getProductUnpid2', payments);
  } catch (error) {
    throw new Error(`Failed to get unpaid products: ${error}`);
  }
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
