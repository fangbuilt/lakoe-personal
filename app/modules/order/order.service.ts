import { z } from "zod";
import { db } from "~/libs/prisma/db.server";

export async function getOrderInShipping() {
  return await db.invoice.findMany({
    where: {
      status: "IN_TRANSIT",
    },
    include: {
      cart: {
        include: {
          store: {
            include: {
              products: true,
            },
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });
}
