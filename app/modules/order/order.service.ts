import type { z } from 'zod';
import type { MootaOrderSchema } from './order.schema';
import { db } from '~/libs/prisma/db.server';

export async function getProductUnpid() {
  const payments = await db.invoice.findMany({
    where: {
      status: 'UNPAID',
    },
    include: {
      user: true,
      payment: true,
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

export async function getAllProductUnpid() {
  const payments = await db.invoice.findMany({
    include: {
      user: true,
      payment: true,
      invoiceHistories: true,
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
  return payments;
}

export async function MootaOrderStatusUpdate(
  data: z.infer<typeof MootaOrderSchema>
) {
  const existingTransaction = await db.payment.findFirst({
    where: {
      amount: data.amount,
      status: 'UNPAID',
    },
  });

  if (existingTransaction) {
    await db.payment.update({
      where: {
        id: existingTransaction.id,
      },
      data: {
        status: 'PAID',
      },
    });

    const relatedInvoice = await db.invoice.findFirst({
      where: {
        paymentId: existingTransaction.id,
      },
    });
    if (relatedInvoice) {
      await db.invoice.update({
        where: {
          id: relatedInvoice.id,
        },
        data: {
          status: 'NEW_ORDER',
        },
      });
      await db.invoiceHistory.create({
        data: {
          status: 'PAID',
          invoiceId: relatedInvoice.id,
        },
      });
    }

    console.log('Paid Payment ,Good Luck Brother :)!');
  }
}

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

export async function updateInvoiceStatus(data: any): Promise<any> {
  try {
    const currentData = await db.invoice.findFirst({
      where: {
        id: data.id, // Ganti dengan ID invoice yang sesuai
      },
    });

    if (!currentData) {
      throw new Error('Invoice tidak ditemukan');
    }

    const newData = {
      status: data.status
        ? data.status.toString()
        : currentData.status.toString(),
    };

    const update = await db.invoice.updateMany({
      data: newData,
      where: {
        status: data.status, // Ganti dengan ID invoice yang sesuai
      },
    });

    return update;
  } catch (error: any) {
    // Menentukan tipe data error sebagai 'any'
    throw new Error(`Gagal mengupdate status invoice: ${error.message}`);
  }
}

export async function getInvoiceByStatus() {
  try {
    const getorderdataforbiteship = await db.invoice.findMany({
      where: {
        status: 'NEW_ORDER',
      },
      include: {
        payment: true,
        courier: true,
        cart: {
          include: {
            store: {
              include: {
                users: true,
                locations: true,
              },
            },
            cartItems: {
              include: {
                product: {
                  include: {
                    attachments: true,
                  },
                },
                variantOption: {
                  include: {
                    variantOptionValues: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    return getorderdataforbiteship;
  } catch (error: any) {
    // Menentukan tipe data error sebagai 'any'
    throw new Error(`Gagal mengambil data invoice: ${error.message}`);
  }
}

export async function getInvoiceProductData() {
  try {
    const dataproductNewOrder = await db.invoice.findMany({
      where: {
        status: 'NEW_ORDER',
      },
      include: {
        payment: true,
        courier: true,
        cart: {
          include: {
            store: {
              include: {
                users: true,
                locations: true,
              },
            },
            cartItems: {
              include: {
                product: {
                  include: {
                    attachments: true,
                  },
                },
                variantOption: {
                  include: {
                    variantOptionValues: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return dataproductNewOrder;
  } catch (error: any) {
    // Menentukan tipe data error sebagai 'any'
    throw new Error(`Gagal mengambil data produk invoice: ${error.message}`);
  }
}

export async function getProductByStoreId(id: any) {
  try {
    const productstoreid = await db.product.findMany({
      where: {
        storeId: id,
      },
      include: {
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
    return productstoreid;
  } catch (error: any) {
    // Menentukan tipe data error sebagai 'any'
    throw new Error(
      `Gagal mengambil data produk berdasarkan ID toko: ${error.message}`
    );
  }
}

export async function getDataProductReadyToShip() {
  return await db.invoice.findMany({
    where: {
      status: 'READY_TO_SHIP',
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
}

export default async function ServiceSuccess() {
  return await db.invoice.findMany({
    where: {
      status: 'ORDER_COMPLETED',
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
}

export async function getProductByCategoryId(id: any) {
  try {
    const productcategoryid = await db.product.findMany({
      where: {
        categoryId: id,
      },
      include: {
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
    return productcategoryid;
  } catch (error: any) {
    // Menentukan tipe data error sebagai 'any'
    throw new Error(
      `Gagal mengambil data produk berdasarkan ID kategori: ${error.message}`
    );
  }
}

export async function updateStatusInvoice(data: any) {
  const { id } = data;
  await db.invoice.update({
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
    where: {
      id: id,
    },
  });
}

export async function whatsappTemplateDb() {
  return await db.messageTemplate.findMany({});
}
export async function updateStatusInvoice2(data: any) {
  const { id } = data;
  const invoice = await db.invoice.findUnique({
    where: {
      id: id,
    },
    select: {
      price: true,
    },
  });
  const price = invoice?.price;

  await db.invoice.update({
    where: {
      id: id,
    },
    data: {
      status: 'ORDER_CANCELLED',
      invoiceHistories: {
        create: {
          status: 'ORDER_CANCELLED',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
      refund: {
        create: {
          attachment: '',
          amount: price ?? 0,
          status: 'REQUEST',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      },
    },
  });
}
