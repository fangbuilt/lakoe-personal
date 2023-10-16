// import { Stack } from "@chakra-ui/react";
// import { redirect, type ActionArgs, type LoaderArgs } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import ProductBody from "~/components/product/ProductBody";
// import { ImplementGrid } from "~/layouts/Grid";
// import { db } from "~/libs/prisma/db.server";
// import { getUserId } from "~/modules/auth/auth.service";
// import {
//   deleteProduct,
//   getProductByStoreId,
//   update,
//   updateIsActive,
// } from "~/modules/product/product.service";

// export async function loader({ request }: LoaderArgs) {
//   const userId = await getUserId(request);
//   if (!userId) {
//     return redirect("/auth/login");
//   }

//   const role = await db.user.findFirst({
//     where: {
//       id: userId as string,
//     },
//   });

//   if (role?.roleId === "1") {
//     return redirect("/dashboardAdmin");
//   } else if (role?.roleId === "2") {
//     return await getProductByStoreId(role.storeId);
//   } else if (role?.roleId === "3") {
//     return redirect("/checkout");
//   } else {
//     return redirect("/logout");
//   }
// }
// // export async function loader({ params }: LoaderArgs) {
// //   return await getProductByStoreId(params.storeId);
// // }

// export async function action({ request, params }: ActionArgs) {
//   if (request.method.toLowerCase() === "delete") {
//     const formData = await request.formData();
//     const id = formData.get("id") as string;

//     await deleteProduct(id);
//   }

//   if (request.method.toLowerCase() === "patch") {
//     const formData = await request.formData();

//     const id = formData.get("id") as string;
//     const price = formData.get("price");
//     const stock = formData.get("stock");
//     const isActive =
//       (formData.get("isActive") as string) === "true" ? false : true;

//     console.log("ini isactive", isActive);

//     if (!isActive || isActive) {
//       const updateIsActiveId = {
//         id,
//         isActive,
//       };
//       await updateIsActive(updateIsActiveId);
//     } else {
//       await update({ id, price, stock });
//     }
//   }

//   return redirect(`/product/${params.storeId}`);
// }

// export default function Product() {
//   const data = useLoaderData<typeof loader>();
//   return (
//     <ImplementGrid>
//       <Stack mt={"7.5vh"} spacing={4}>
//         <ProductBody product={data} />
//       </Stack>
//     </ImplementGrid>
//   );
// }
