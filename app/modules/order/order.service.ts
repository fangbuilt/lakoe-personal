import { db } from '~/libs/prisma/db.server';

export async function getInvoiceById(id: any) {
  const dataInvoice = await db.invoice.findFirst({
    where: {
      id,
    },
    include: {
      invoiceHistories: true,
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

  await db.invoice.update({
    where: {
      id: id,
    },
    data: {
      status: 'READY_TO_SHIP',
      invoiceHistories: {
        create: {
          status: 'READY_TO_SHIP',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });
}
