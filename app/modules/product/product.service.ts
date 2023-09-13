// import { z } from "zod";
import { db } from '~/libs/prisma/db.server';

export async function createProduct(data: any, storeId: any) {
  try {
    const newProduct = await db.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        attachments: data.attachments,
        minumumOrder: data.minumumOrder,
        store: {
          connect: { id: storeId },
        },
        category: {
          create: {
            name: data.category,
          },
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
                          size: {
                            create: {
                              height: data.height,
                              width: data.width,
                              length: data.length,
                            },
                          },
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
        variants: {
          include: {
            variantOptions: {
              include: {
                variantOptionValues: {
                  // include: {
                  // }
                },
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
