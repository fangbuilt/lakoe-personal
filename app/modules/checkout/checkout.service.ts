import { redirect } from '@remix-run/node';
import { db } from '../../libs/prisma/db.server';

export async function getCheckoutDetail(data: any) {
  const product = await db.product.findUnique({
    where: {
      slug: data.slug,
      store: {
        name: {
          equals: data.store,
          // mode: 'insensitive',
        },
      },
    },
    include: {
      store: {
        include: {
          users: true,
        },
      },
      attachments: true,
      variants: {
        include: {
          variantOptions: {
            include: {
              variantOptionValues: true,
            },
          },
        },
      },
    },
  });
  return product;
}

export async function createCheckout(data: any) {
  const payment = await db.payment.create({
    data: data.getPayment,
  });

  const cart = await db.cart.create({
    data: data.cart,
  });

  const courier = await db.courier.create({
    data: data.getCourier,
  });

  await db.cartItem.create({
    data: {
      ...data.cartItem,
      cartId: cart.id,
    },
  });

  const invoice = await db.invoice.create({
    data: {
      ...data.invoice,
      cartId: cart.id,
      paymentId: payment.id,
      courierId: courier.id,
    },
  });

  await db.invoiceHistory.create({
    data: { ...data.invoiceHistory, invoiceId: invoice.id },
  });

  await db.variantOptionValue.update({
    where: {
      id: data.update.valueId as string,
    },
    data: { stock: data.update.stock as number },
  });

  return redirect(`/transfer/${invoice.id}`);
}
