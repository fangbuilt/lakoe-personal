// search.ts

import { db } from '~/libs/prisma/db.server';

export async function searchInvoices(query: string) {
  try {
    const invoices = await db.invoice.findMany({
      where: {
        // Sesuaikan kondisi pencarian sesuai kebutuhan Anda.
        OR: [
          {
            receiverName: {
              contains: query,
            },
          },
          {
            invoiceNumber: {
              contains: query,
            },
          },
        ],
      },
    });
    return invoices;
  } catch (error) {
    throw new Error('Gagal melakukan pencarian faktur');
  } finally {
    await db.$disconnect();
  }
}
