// import { Stack } from "@chakra-ui/react";
// import type { LoaderArgs } from "@remix-run/node";
// import { useLoaderData } from "@remix-run/react";
// import type { IOrderDetailInvoice } from "~/interfaces/orderDetail";
// import { ImplementGrid } from "~/layouts/Grid";
// import StatusOrderDetail from "~/modules/order/components/statusOrderDetail";
// import { getInvoiceById } from "~/modules/order/order.service";

// export async function loader({ params }: LoaderArgs) {
//   const { id } = params;

//   try {
//     const dataCart = await getInvoiceById(id as string);
//     return dataCart;
//   } catch (error) {
//     console.error("Loader error:", error);
//     throw error;
//   }
// }

// export default function OrderDetailId() {
//   const data = useLoaderData<IOrderDetailInvoice>();
//   return (
//     <>
//       <ImplementGrid>
//         <Stack mt={"7.5vh"} spacing={4}>
//           <StatusOrderDetail data={data} />
//         </Stack>
//       </ImplementGrid>
//     </>
//   );
// }
