import crypto from "crypto";

import { json, redirect, type ActionArgs, LoaderArgs } from '@remix-run/node';
import { MootaOrderSchema } from '~/modules/order/order.schema';
import {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getDataProductReadyToShip,
  getInvoiceByStatus,
  updateInvoiceStatus,
  CanceledService,
  whatsappTemplateDb,
  SuccessService,
  getProductUnpid,

} from '~/modules/order/order.service';

import { Flex} from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import {NavOrder} from '~/layouts/NavOrder';
import { db } from '~/libs/prisma/db.server';
import getDataInShipping from '~/modules/order/orderShippingService';

export const loader = async ({ request }: LoaderArgs) => {
  const apiKey = process.env.BITESHIP_API_KEY;
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search") || "";

  try {
    const [unpaidCardAll, unpaidCard, canceledService, whatsappDb, succesService] = await Promise.all([
      getAllProductUnpid(),
      getProductUnpid(searchTerm),
      CanceledService(),
      whatsappTemplateDb(),
      SuccessService(),
      

    ]);

    const dataInvoice = await getInvoiceByStatus();

    const currentTime = new Date().getTime()

    return json({
      unpaidCardAll,
      unpaidCard,
      canceledService,
      whatsappDb,
      succesService,
      dataInvoice,
      dataShipping: await getDataInShipping(),
      dataProductReadyToShip: await getDataProductReadyToShip(),
      apiKey,
      currentTime,
    });
  } catch (error) {
    console.error("error:", error);
    return json({ status: "error", message: "Terjadi kesalahan dalam memuat data" }, 500);
  }
};
export async function action({ request }: ActionArgs) {
  const requestIP = request.headers.get("x-forwarded-for") as string;

  const formData = await request.formData();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const actionType = formData.get("actionType") as string;

  // console.log('yg kamu cari', id, actionType, status);

  const invoiceId = String(formData.get("invoiceId"));
  const userId = "2";
  const now = new Date();

  // Calculate the timestamp 30 minutes in the future
  const nextAccessTime = new Date(now.getTime() + 10000);
  console.log("ini data nextAccessTime", nextAccessTime);

  if (actionType === "createTrackingLimit") {
    const data = {
      userId,
      invoiceId,
      nextAccessTime,
      updatedAt: now,
    };

    // await db.biteshipTrackingLimit.deleteMany({
    //   where: {
    //     invoiceId: invoiceId
    //   }
    // })

    const isAvailable = await db.biteshipTrackingLimit.findFirst({
      where: {
        invoiceId: invoiceId,
      },
    });

    if (isAvailable) {
      await db.biteshipTrackingLimit.update({
        where: {
          id: isAvailable.id,
        },
        data: {
          nextAccessTime: nextAccessTime,
        },
      });
    } else {
      await db.biteshipTrackingLimit.create({ data });
    }

    // await db.biteshipTrackingLimit.create({data})

    return json({ message: "data added." });
  }

  if (actionType === "updateInvoiceAndHistoryStatusReadyToShip") {
    // console.log('masuk sini');

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
    // console.log('Status "READY_TO_SHIP" berhasil dibuat dan diupdate.');
  }

  if (isMootaIP(requestIP)) {
    if (request.method === "POST") {
      try {
        const requestBody = await request.text();

        const payloads = JSON.parse(requestBody);

        const secretKey = process.env.MOOTA_SECRET as string;

        const amount = payloads[0].amount as number;

        const signature = request.headers.get("Signature") as string;

        if (verifySignature(secretKey, requestBody, signature)) {
          const MootaOrder = MootaOrderSchema.parse({
            amount,
          });
          await MootaOrderStatusUpdate(MootaOrder);
        } else {
          console.log("error verify Signature!");
        }
        return json({ data: requestBody }, 200);
      } catch (error) {
        return new Response("Error in The Use webhook", {
          status: 500,
        });
      }
    }
  }

  if (request.method.toLowerCase() === "patch") {
    const formData = await request.formData();

    const id = formData.get("id") as string;
    const price = formData.get("price");
    const stock = formData.get("stock");

    await updateInvoiceStatus({ id, price, stock });
  }
  return redirect("/order");
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
