import { db } from '~/libs/prisma/db.server';

export async function updateInvoiceStatusReadyToShip(dataInvoice: any) {
  await db.invoice.update({
    where: {
      id: dataInvoice.id,
    },
    data: {
      status: 'READY_TO_SHIP',
    },
  });

  const data = {
    status: 'READY_TO_SHIP',
    invoiceId: dataInvoice.id,
  };
  await db.invoiceHistory.create({ data });
}
