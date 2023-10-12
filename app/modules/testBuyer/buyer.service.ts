// import { z } from "zod";
// import { db } from "~/libs/prisma/db.server";
// import { PrismaClient } from "@prisma/client";
// import { checkoutSchema } from "./buyer.schema";

// const prisma = new PrismaClient()

// export async function getDatas() {
//   // export async function login(data: z.infer<typeof checkoutSchema>) {}
//   return await prisma.product.findMany()
// }

// export async function createBuying(data: any) {
//   const buy = await prisma.invoice.create({
//       data: data
//   })

//   return buy
// }
// // export async function createBuying(data : any) {
// //   const buy = await prisma.cart.create({
// //       data:data
// //   })

// //   return buy
// // }
