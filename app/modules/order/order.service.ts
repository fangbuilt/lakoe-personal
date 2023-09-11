import { db } from "~/libs/prisma/db.server";

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
              product: true,
            },
          },
        },
      },
    },
  });
  return dataInvoice;
}
