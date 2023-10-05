import { db } from '~/libs/prisma/db.server';

export async function getProductUnpidNew(searchTerm: string, status: string) {
  let getsearchTerm = searchTerm;
  if (!searchTerm) {
    getsearchTerm = '';
  }

  let getStatus = '';
  if (!status) {
    getStatus = '';
  } else if (status === 'all') {
    getStatus = '';
  } else if (status === 'unpaid') {
    getStatus = 'UNPAID';
  } else if (status === 'ready') {
    getStatus = 'NEW_ORDER';
  } else if (status === 'send') {
    getStatus = 'READY_TO_SHIP';
  } else if (status === 'shipped') {
    getStatus = 'IN_TRANSIT';
  } else if (status === 'success') {
    getStatus = 'ORDER_COMPLETED';
  } else if (status === 'cancel') {
    getStatus = 'ORDER_CANCELLED';
  } else {
    getStatus = '';
  }

  console.log('This is the searchTerm', getsearchTerm);
  console.log('This is the searchTerm', searchTerm);
  const payments = await db.invoice.findMany({
    where: {
      status: getStatus,
      cart: {
        cartItems: {
          some: {
            product: {
              name: {
                contains: searchTerm,
              },
            },
          },
        },
      },
    },

    include: {
      user: true,
      payment: true,
      courier: true,
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
  return payments;
}
