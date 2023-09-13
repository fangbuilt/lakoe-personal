import { db } from '~/libs/prisma/db.server';

export async function getProduct() {
  const data = await db.product.findMany({
    orderBy: {
      id: 'desc',
    },
    include: {
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

export async function deleteProduct(id: any) {
  const data = await db.product.delete({
    where: {
      id,
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
  console.log('ini update', update);
  return update;
}
