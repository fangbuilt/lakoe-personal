// import { db } from "~/libs/prisma/db.server";

// export async function createVariant(data: any, productId: any) {
//   try {
//     const newVariant = await db.variant.create({

//       data: {
//         name: data.variantName,
//         isActive: true,
//         productId: productId.id,
//         variantOptions: {
//           create: [
//             {
//               name: '',
//               variantOptionValues: {
//                 create: [
//                 {

//                 }
//                 ],
//               },
//             },

//           ],
//         },
//       },
//       include: {
//         variantOptions: {
//           include: {
//             variantOptionValues: true,
//           },
//         },
//       },
//     });

//     return newVariant;
//   } catch (error: any) {
//     throw new Error(error);
//   }
// }
