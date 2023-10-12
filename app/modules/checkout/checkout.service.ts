import { redirect } from '@remix-run/node';
import { db } from '../../libs/prisma/db.server';

export async function getCheckoutDetail(data: any) {
  try {
    const product = await db.product.findUnique({
      where: {
        slug: data.slug,
        store: {
          name: {
            equals: data.store,
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

    const invoices = await db.invoice.findMany({
      where: {
        status: 'UNPAID',
      },
    });

    let unique = Math.floor(Math.random() * (200 - 100)) + 100;

    const matchingInvoices = invoices.filter((invoice) => {
      return invoice.price % 1000 === unique;
    });

    if (matchingInvoices.length > 0) {
      // Update unique if needed
      unique = Math.floor(Math.random() * (200 - 100)) + 100;
    }

    return { product, unique };
  } catch (error) {
    console.log(error);
    return null;
  }
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
      id: data.updateStock.valueId as string,
    },
    data: { stock: data.updateStock.stock as number, updatedAt: new Date() },
  });

  return redirect(`/transfer/${invoice.id}`);
}
