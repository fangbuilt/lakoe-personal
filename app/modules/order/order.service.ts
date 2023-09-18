import { db } from '~/libs/prisma/db.server';

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

export async function GetInvoiceProductData() {
  try {
    const dataproductNewOrder = await db.invoice.findMany({
      where: {
        status: 'NEW_ORDER',
      },
      include: {
        cart: {
          include: {
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
