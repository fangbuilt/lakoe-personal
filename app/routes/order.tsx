// import crypto from "crypto";

import { json } from '@remix-run/node';
import type { DataFunctionArgs } from '@remix-run/node';
import {
  getAllProductUnpid,
  getDataProductReadyToShip,
  getInvoiceByStatus,
  getProductUnpid,
} from '~/modules/order/order.service';

// import { Flex } from "@chakra-ui/react";
// import { useLoaderData } from "@remix-run/react";
// import { ImplementGrid } from "~/layouts/Grid";
// // import NavOrder from '~/layouts/NavOrder';

import CanceledService from '~/modules/order/orderCanceledService';
import getDataInShipping from '~/modules/order/orderShippingService';
import { authorize } from '~/middleware/authorization';

// // export async function action({ request }: ActionArgs) {
// //   if (request.method.toLowerCase() === 'patch') {
// //     const formData = await request.formData();

// //     const id = formData.get('id') as string;
// //     const price = formData.get('price');
// //     const stock = formData.get('stock');

// //     await updateInvoiceStatus({ id, price, stock });
// //   }

// //   return redirect('/order');
// // }

// // export async function loader() {
// //   const apiKey = process.env.BITESHIP_API_KEY;
// //   const dataProductReadyToShip = await getDataProductReadyToShip();

// //   const [canceledService] = await Promise.all([
// //     CanceledService(),
// //     // ready(),
// //     //your order service here !
// //   ]);
// //   const dataInvoice = await getInvoiceByStatus();

// //   return json({
// //     canceledService,
// //     dataInvoice,
// //     dataShipping: await getDataInShipping(),
// //     dataProductReadyToShip,
// //     apiKey,
// //     // your return order service here !
// //   });
// // }

// export async function loader() {
//   const apiKey = process.env.BITESHIP_API_KEY;
//   const dataProductReadyToShip = await getDataProductReadyToShip();
//   //jangan ampai terbalik posisi untuk menampilkan data load
//   const [unpaidCardAll, unpaidCard, canceledService] = await Promise.all([
//     getAllProductUnpid(),
//     getProductUnpid(),
//     CanceledService(),
//   ]);
//   const dataInvoice = await getInvoiceByStatus();
//   return json({
//     unpaidCardAll,
//     unpaidCard,
//     canceledService,
//     dataInvoice,
//     dataShipping: await getDataInShipping(),
//     dataProductReadyToShip,
//     apiKey,
//   });
// }

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '2');

  const apiKey = process.env.BITESHIP_API_KEY;
  const dataProductReadyToShip = await getDataProductReadyToShip();
  //jangan ampai terbalik posisi untuk menampilkan data load
  const [unpaidCardAll, unpaidCard, canceledService] = await Promise.all([
    getAllProductUnpid(),
    getProductUnpid(),
    CanceledService(),
  ]);
  const dataInvoice = await getInvoiceByStatus();

  return json({
    unpaidCardAll,
    unpaidCard,
    canceledService,
    dataInvoice,
    dataShipping: await getDataInShipping(),
    dataProductReadyToShip,
    apiKey,
  });
}

//   const formData = await request.formData();
//   const id = formData.get("id") as string;
//   const status = formData.get("status") as string;
//   const actionType = formData.get("actionType") as string;

//   console.log("yg kamu cari", id, actionType, status);

//   if (actionType === "updateInvoiceAndHistoryStatusReadyToShip") {
//     console.log("masuk sini");

//     await db.invoiceHistory.create({
//       data: {
//         status: status,
//         invoiceId: id,
//       },
//     });

//     await db.invoice.update({
//       where: {
//         id: id,
//       },
//       data: {
//         status: status,
//       },
//     });

//     // alert
//     console.log('Status "READY_TO_SHIP" berhasil dibuat dan diupdate.');
//   }

//   if (isMootaIP(requestIP)) {
//     if (request.method === "POST") {
//       try {
//         const requestBody = await request.text();

//         const payloads = JSON.parse(requestBody);

//         const secretKey = process.env.MOOTA_SECRET as string;

//         const amount = payloads[0].amount as number;

//         const signature = request.headers.get("Signature") as string;

//         if (verifySignature(secretKey, requestBody, signature)) {
//           const MootaOrder = MootaOrderSchema.parse({
//             amount,
//           });
//           await MootaOrderStatusUpdate(MootaOrder);
//         } else {
//           console.log("error verify Signature!");
//         }
//         return json({ data: requestBody }, 200);
//       } catch (error) {
//         return new Response("Error in The Use webhook", {
//           status: 500,
//         });
//       }
//     }
//   }

//   if (request.method.toLowerCase() === "patch") {
//     const formData = await request.formData();

//     const id = formData.get("id") as string;
//     const price = formData.get("price");
//     const stock = formData.get("stock");

//     await updateInvoiceStatus({ id, price, stock });
//   }
//   return redirect("/order");
// }

// function isMootaIP(requestIP: string) {
//   const allowedIPs = process.env.ALLOWED_IPS?.split(",") ?? [];
//   return allowedIPs.includes(requestIP);
// }
// function verifySignature(secretKey: string, data: string, signature: string) {
//   const hmac = crypto.createHmac("sha256", secretKey);
//   const computedSignature = hmac.update(data).digest("hex");
//   console.log("computedSignature", computedSignature);
//   return computedSignature === signature;
// }

// export default function Order() {
//   const data = useLoaderData<typeof loader>();

//   return (
//     <ImplementGrid>
//       <Flex align={"center"} justify={"center"} h={"100vh"}>
//         {/* <NavOrder cardProduct={data} /> */}
//       </Flex>
//     </ImplementGrid>
//   );
// }
