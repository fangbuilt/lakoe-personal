import { db } from '~/libs/prisma/db.server';

export async function getInvoiceById(id: any) {
  const dataInvoice = await db.invoice.findFirst({
    where: {
      id,
    },
    include: {
      courier: true,
      cart: {
        include: {
          user: true,
          cartItems: {
            include: {
              variantOption: {
                include: {
                  variantOptionValues: true,
                },
              },
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
  return dataInvoice;
}

export async function updateStatusInvoice(data: any) {
  const { id } = data;
  return await db.invoice.update({
    data: {
      status: 'READY_TO_SHIP',
    },
    where: {
      id: id,
    },
  });
}
