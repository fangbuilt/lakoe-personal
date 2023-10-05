import { db } from '~/libs/prisma/db.server';
import type { z } from 'zod';
import type { MootaOrderSchema, confirmationApiSchema } from './order.schema';

export async function getProductUnpid() {
  const payments = await db.invoice.findMany({
    where: {
      status: 'UNPAID',
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

  const matchingConfirmationPayment = await db.confirmationPayment.findFirst({
    where: {
      amount: data.amount,
    },
    include: {
      invoice: {
        select: {
          paymentId: true,
        },
      },
    },
  });

  if (existingTransaction || matchingConfirmationPayment) {
    const invoiceId = existingTransaction
      ? existingTransaction.id
      : matchingConfirmationPayment?.invoice?.paymentId;

    await db.payment.update({
      where: {
        id: invoiceId,
      },
      data: {
        status: 'PAID',
      },
    });

    const relatedInvoice = await db.invoice.findFirst({
      where: {
        paymentId: invoiceId,
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
          status: 'PAYMENT_COMPLETED',
          invoiceId: relatedInvoice.id,
        },
      });
    }

    console.log('Paid Payment ,Good Luck Brother :) !');
  }
}
export async function ConfirmationPaymentsApiMoota(
  data: z.infer<typeof confirmationApiSchema>
) {
  console.log('data service', data);
  await db.confirmationPayment.create({
    data: {
      invoiceId: data.invoiceId,
      bank: data.bank,
      createdAt: data.createdAt,
      amount: data.amount,
      attachment: data.attachment,
    },
  });
  const relatedInvoice = await db.invoice.findFirst({
    where: {
      paymentId: data.invoiceId,
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
        status: 'PAYMENT_COMPLETED',
        invoiceId: relatedInvoice.id,
      },
    });
  }
  await db.payment.update({
    where: {
      id: data.invoiceId,
    },
    data: {
      status: 'PAID',
    },
  });

  console.log('confirmation berhasil di tambahkan');
}

export async function getInvoiceById(id: any) {
  const dataInvoice = await db.invoice.findFirst({
    where: {
      id,
    },
    include: {
      invoiceHistories: true,
      courier: true,
      biteshipTrackinglimits: true,
      cart: {
        include: {
          user: true,
          store: {
            include: {
              locations: true,
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
      biteshipTrackinglimits: true,
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

export async function getTemplateMessage() {
  return await db.messageTemplate.findMany();
}

export async function CanceledService() {
  return await db.invoice.findMany({
    where: {
      status: 'ORDER_CANCELLED',
    },
    include: {
      courier: true,
      user: true,
      cart: {
        include: {
          store: true,
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
export async function updateStatusInvoice2(data: any) {
  const { id } = data;
  await db.invoice.update({
    data: {
      status: 'ORDER_CANCELLED',
      invoiceHistories: {
        create: {
          status: 'ORDER_CANCELLED',
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
export async function SuccessService() {
  return await db.invoice.findMany({
    where: {
      status: 'ORDER_COMPLETED',
    },
    include: {
      courier: true,
      user: true,
      cart: {
        include: {
          store: true,
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

export async function whatsappTemplateDb() {
  return await db.messageTemplate.findMany({});
}

export default async function getDataInShipping() {
  return await db.invoice.findMany({
    where: {
      status: 'IN_TRANSIT',
    },
    include: {
      courier: true,
      biteshipTrackinglimits: true,
      cart: {
        include: {
          cartItems: {
            include: {
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
