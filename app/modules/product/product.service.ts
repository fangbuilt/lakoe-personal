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
              url: data.url1,
            },
            {
              url: data.url2,
            },
            {
              url: data.url3,
            },
            {
              url: data.url4,
            },
            {
              url: data.url5,
            },
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
                      create: data.variants,
                    },
                  },
                ],
              },
            },
            // {
            //   name: data.name,
            //   isActive: true,
            //   variantOptions: {
            //     create: [
            //       {
            //         name: data.name,
            //         variantOptionValues: {
            //           create:
            //             [
            //               {
            //                 price: data.price2,
            //                 sku: data.sku2,
            //                 stock: data.stock2,
            //                 weight: data.weight2,
            //                 isActive: true,
            //               },
            //             ],
            //         },
            //       },
            //     ],
            //   },
            // },
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

export async function getProduct(id: any) {
  const store = await db.user.findFirst({
    where: {
      id: id,
    },
  });
  const data = await db.product.findMany({
    where: {
      store: {
        id: store?.storeId as string,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      store: {
        include: {
          users: true,
        },
      },
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

export async function getProductAll() {
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

export async function deleteProduct(id: any) {
  const getProductInvoice = await db.invoice.findFirst({
    where: {
      cart: {
        cartItems: {
          some: {
            productId: id,
          },
        },
      },
    },
  });
  // console.log("ini id product", getProductInvoice);
  if (!getProductInvoice) {
    await db.product.delete({
      where: {
        id: id,
      },
    });
    const isSuccess = true;
    return isSuccess;
  } else {
    const isSuccess = false;
    return isSuccess;
  }
}

// export async function productCategory(id: any) {
//   const data = await db.category.findMany({
//     where: {
//       parentId: id,
//     },
//     select: { id: true },
//   });

//   const newData = await db.category.findMany({
//     where: {
//       parentId: {
//         in: data.map((value) => value.id),
//       },
//     },
//   });
//   console.log("this data!", newData);
//   return newData;
// }

export async function getProductTest(
  filterSearch: string,
  filterCategory: string
) {
  const whereSearch = filterSearch
    ? {
        name: {
          contains: filterSearch,
        },
      }
    : {};
  const whereCategory = filterCategory
    ? {
        category: {
          name: {
            in: filterCategory,
          },
        },
      }
    : {};
  const data = await db.product.findMany({
    where: {
      AND: [whereSearch, whereCategory],
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      category: true,
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
  console.log('get data product', data);
  return data;
}

export default async function getProductTestFilter(
  filterSearch: string,
  filterCategory: string[]
  // filterSort: string
) {
  const allCategory = [
    // "Audio, Kamera & Elektronik",
    'Buku',
    'Dapur',
    // "Fashion Anak & Bayi",
    // "Fashion Muslim",
    // "Fashion Pria",
    // "Fashion Wanita",
  ];

  let getCategory = filterCategory;
  if (!filterCategory) {
    getCategory = allCategory;
  }

  let searchProduct = filterSearch;
  if (!filterSearch) {
    searchProduct = '';
  }
  // let getSort = filterSort
  // if (!filterSort){
  //   getSort = 'desc'
  // }
  const data = await db.product.findMany({
    where: {
      name: searchProduct,
      category: {
        name: {
          in: getCategory,
        },
      },
    },
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
  // console.log('ini', data);
  return data;
}
