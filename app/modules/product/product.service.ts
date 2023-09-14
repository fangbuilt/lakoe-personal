// import { z } from "zod";
import { db } from '~/libs/prisma/db.server';

export async function createProduct(data: any, storeId: any) {
  try {
    const newProduct = await db.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        minumumOrder: data.minumumOrder,
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
