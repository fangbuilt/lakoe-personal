import { db } from '../../libs/prisma/db.server';

export async function getCheckoutDetail(data: any) {
  const id = data.id as string;
  return await db.product.findUnique({
    where: {
      id: id,
    },
    include: {
      store: {
        include: {
          users: true,
        },
      },
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
  });
}

export async function createCheckout(data: any) {
  const cart = await db.cart.create({ data: data.cart });

  await db.cartItem.create({
    data: {
      ...data.cartItem,
      cardId: cart.id,
    },
  });

  const invoice = await db.invoice.create({
    data: { ...data.invoice, cartId: cart.id },
  });

  await db.invoiceHistory.create({
    data: { ...data.invoiceHistory, invoiceId: invoice.id },
  });

  return null;
}
