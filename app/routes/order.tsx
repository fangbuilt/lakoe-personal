import crypto from "crypto";

import { json, redirect } from "@remix-run/node";
import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { MootaOrderSchema } from "~/modules/order/order.schema";
import {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getDataProductReadyToShip,
  getInvoiceByStatus,
  getProductUnpid,
  updateInvoiceStatus,
} from "~/modules/order/order.service";

import { Flex } from "@chakra-ui/react";
import { useLoaderData } from "@remix-run/react";
import { ImplementGrid } from "~/layouts/Grid";
import NavOrder from "~/layouts/NavOrder";

import { db } from '~/libs/prisma/db.server';
import CanceledService from '~/modules/order/orderCanceledService';
import getDataInShipping from '~/modules/order/orderShippingService';
import { getUserId } from '~/modules/auth/auth.service';

// export async function action({ request }: ActionArgs) {
//   if (request.method.toLowerCase() === 'patch') {
//     const formData = await request.formData();

//     const id = formData.get('id') as string;
//     const price = formData.get('price');
//     const stock = formData.get('stock');

//     await updateInvoiceStatus({ id, price, stock });
//   }

//   return redirect('/order');
// }

// export async function loader() {
//   const apiKey = process.env.BITESHIP_API_KEY;
//   const dataProductReadyToShip = await getDataProductReadyToShip();

//   const [canceledService] = await Promise.all([
//     CanceledService(),
//     // ready(),
//     //your order service here !
//   ]);
//   const dataInvoice = await getInvoiceByStatus();

//   return json({
//     canceledService,
//     dataInvoice,
//     dataShipping: await getDataInShipping(),
//     dataProductReadyToShip,
//     apiKey,
//     // your return order service here !
//   });
// }

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect("/auth/login");
  }

  const apiKey = process.env.BITESHIP_API_KEY;
  const dataProductReadyToShip = await getDataProductReadyToShip();
  //jangan ampai terbalik posisi untuk menampilkan data load
  const [unpaidCardAll, unpaidCard, canceledService] = await Promise.all([
    getAllProductUnpid(),
    getProductUnpid(),
    CanceledService(),
  ]);
  const dataInvoice = await getInvoiceByStatus();

  const role = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  const currentTime = new Date().getTime();

  if (role?.roleId === "1") {
    return redirect("/dashboardAdmin");
  } else if (role?.roleId === "2") {
    return json({
      unpaidCardAll,
      unpaidCard,
      canceledService,
      dataInvoice,
      dataShipping: await getDataInShipping(),
      dataProductReadyToShip,
      apiKey,
      currentTime,
    });
  } else if (role?.roleId === "3") {
    return redirect("/checkout");
  } else {
    return redirect("/logout");
  }
}

export async function action({ request }: ActionArgs) {
  const requestIP = request.headers.get("x-forwarded-for") as string;

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const actionType = formData.get("actionType") as string;

  console.log('yg kamu cari', id, actionType, status);

  if (actionType === 'updateInvoiceAndHistoryStatusReadyToShip') {
    console.log('masuk sini');

    await db.invoiceHistory.create({
      data: {
        status: status,
        invoiceId: id,
      },
    });

    await db.invoice.update({
      where: {
        id: id,
      },
      data: {
        status: status,
      },
    });

    // alert
    console.log('Status "READY_TO_SHIP" berhasil dibuat dan diupdate.');
  }
}

function isMootaIP(requestIP: string) {
  const allowedIPs = process.env.ALLOWED_IPS?.split(",") ?? [];
  return allowedIPs.includes(requestIP);
}
function verifySignature(secretKey: string, data: string, signature: string) {
  const hmac = crypto.createHmac("sha256", secretKey);
  const computedSignature = hmac.update(data).digest("hex");
  console.log("computedSignature", computedSignature);
  return computedSignature === signature;
}

export default function Order() {
  const data = useLoaderData<typeof loader>();

  return (
    <ImplementGrid>
      <Flex align={"center"} justify={"center"} h={"100vh"}>
        <NavOrder cardProduct={data} />
      </Flex>
    </ImplementGrid>
  );
}
