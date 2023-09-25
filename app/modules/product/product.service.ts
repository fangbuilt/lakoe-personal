import { db } from '~/libs/prisma/db.server';

export async function createProduct(data: any, storeId: any) {
  try {
    const newProduct = await db.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        minimumOrder: data.minimumOrder,
        length: data.length,
        width: data.width,
        height: data.height,
        store: {
          connect: { id: storeId },
        },
        category: {
          create: {
            name: data.category,
          },
        },
        attachments: {
          create: [
            {
              url: data.url,
            },
            {
              url: data.url2,
            },
            // {
            //   url: data.url3,
            // },
            // {
            //   url: data.url4,
            // },
            // {
            //   url: data.url5
            // }
          ],
        },

        variants: {
          create: [
            {
              name: data.name,
              isActive: true,
              variantOptions: {
                create: [
                  {
                    name: data.name,
                    variantOptionValues: {
                      create: [
                        {
                          price: data.price,
                          sku: data.sku,
                          stock: data.stock,
                          weight: data.weight,
                          isActive: true,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      include: {
        category: true,
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

    return newProduct;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProduct() {
  const data = await db.product.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      store: true,
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
  return data;
}

export async function getProductByStoreId(id: any) {
  const data = await db.product.findMany({
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
  return data;
}

export async function getProductByCategoryId(id: any) {
  const data = await db.product.findMany({
    where: {
      categoryId: id,
    },
    include: {
      store: true,
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
  return data;
}

export async function deleteProduct(id: string) {
  const deleteProduct = await db.product.delete({
    where: {
      id: id,
    },
  });
  return deleteProduct;
}

export async function update(data: any): Promise<any> {
  const currentData = await db.variantOptionValue.findFirst({
    where: {
      variantOption: {
        variant: {
          id: data.id,
        },
      },
    },
  });
  const newData = {
    price: data.price ? parseFloat(data.price) : currentData?.price,
    stock: data.stock ? parseInt(data.stock) : currentData?.stock,
  };

  const update = await db.variantOptionValue.updateMany({
    data: newData,
    where: {
      variantOption: {
        variant: {
          product: {
            id: data.id,
          },
        },
      },
    },
  });
  return update;
}

export async function updateIsActive(data: any) {
  const status = await db.product.update({
    data: {
      isActive: data.isActive,
    },
    where: {
      id: data.id,
    },
  });
  return status;
}

export async function deleteProductInvoices(data: any) {
  try {
    const getInvoices = await db.invoice.findFirst({
      where: {
        cart: {
          store: {
            products: data,
          },
        },
      },
    });
    if (getInvoices) {
      return { success: false, message: 'Produk sudah ada dalam faktur.' };
    }

    await db.product.delete({
      where: {
        id: data.id,
      },
    });
    return { success: true, message: 'Produk berhasil dihapus.' };
  } catch (error) {
    console.error('Terjadi kesalahan saat menghapus produk:', error);
    return {
      success: false,
      message: 'Terjadi kesalahan saat menghapus produk.',
    };
  }
}
