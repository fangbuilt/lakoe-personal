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
  const postCart = await db.cart.create({ data: data.cart });

  await db.cartItem.create({
    data: {
      ...data.cartItem,
      // cardId: postCart.id,
    },
  });

  return await db.invoice.create({
    data: { ...data.invoice, cartId: postCart.id },
  });
}
