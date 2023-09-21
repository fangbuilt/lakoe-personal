import { LoaderFunction, json } from "@remix-run/node";
import { db } from "~/libs/prisma/db.server";

export default async function testCanceledService(searchQuery) {
  const { searchQuery } = params;

  return  await db.invoice.findMany({
    where: {
      status: "ORDER_CANCELLED",
      OR: [
        {
          cart: {
            cartItems: {
              some: {
                product: {
                  name: {
                    contains: searchQuery,
                  },
                },
              },
            },
          },
        },
      ],
    },
    include: {
      courier: true,
      user: true,
      cart: {
        include: {
          store: {
            include: {
              messageTemplates: true,
            },
          },
          cartItems: {
            include: {
              product: {
                include: {
                  attachments: true,
                  store: true,
                },
              },
            },
          },
        },
      },
    },
  });
};
