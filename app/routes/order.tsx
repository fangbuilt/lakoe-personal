/* eslint-disable @typescript-eslint/no-unused-vars */
import crypto from 'crypto';

import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';

import { MootaOrderSchema } from '~/modules/order/order.schema';
import ServiceSuccess, {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getDataProductReadyToShip,
  getInvoiceByStatus,
  getProductUnpid,
  whatsappTemplateDb,
} from '~/modules/order/order.service';

import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import NavOrder from '~/layouts/NavOrder';

import { db } from '~/libs/prisma/db.server';
import { authorize } from '~/middleware/authorization';
import { getUserId } from '~/modules/auth/auth.service';
import CanceledService from '~/modules/order/orderCanceledService';
import getDataInShipping from '~/modules/order/orderShippingService';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '2');
  const userId = await getUserId(request);

  const apiKey = process.env.BITESHIP_API_KEY;
  const dataProductReadyToShip = await getDataProductReadyToShip();
  //jangan ampai terbalik posisi untuk menampilkan data load
  const [
    unpaidCardAll,
    unpaidCard,
    canceledService,
    successedService,
    whatsappDb,
  ] = await Promise.all([
    getAllProductUnpid(),
    getProductUnpid(),
    CanceledService(),
    ServiceSuccess(),
    whatsappTemplateDb(),
  ]);
  const dataInvoice = await getInvoiceByStatus();
  const role = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (role?.roleId === '1') {
    return redirect('/dashboardAdmin');
  } else if (role?.roleId === '2') {
    return json({
      unpaidCardAll,
      unpaidCard,
      canceledService,
      successedService,
      whatsappDb,
      dataInvoice,
      dataShipping: await getDataInShipping(),
      dataProductReadyToShip,
      apiKey,
    });
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
}

function isMootaIP(requestIP: string) {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') ?? [];
  return allowedIPs.includes(requestIP);
}
function verifySignature(secretKey: string, data: string, signature: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  const computedSignature = hmac.update(data).digest('hex');
  console.log('computedSignature', computedSignature);
  return computedSignature === signature;
}

export async function action({ request }: ActionArgs) {
  const requestIP = request.headers.get('x-forwarded-for') as string;

  const formData = await request.formData();
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  const actionType = formData.get('actionType') as string;

  console.log('yg kamu cari', id, actionType, status);

  if (actionType === 'updateDbCourierId') {
    const id = formData.get('id') as string;
    const orderId = formData.get('orderId') as string;

    await db.courier.update({
      where: {
        id,
      },
      data: {
        orderId,
      },
    });
  }

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

    if (isMootaIP(requestIP)) {
      if (request.method === 'POST') {
        try {
          const requestBody = await request.text();

          const payloads = JSON.parse(requestBody);

          const secretKey = process.env.MOOTA_SECRET as string;

          const amount = payloads[0].amount as number;

          const signature = request.headers.get('Signature') as string;

          if (verifySignature(secretKey, requestBody, signature)) {
            const MootaOrder = MootaOrderSchema.parse({
              amount,
            });
            await MootaOrderStatusUpdate(MootaOrder);
          } else {
            console.log('error verify Signature!');
          }
          return json({ data: requestBody }, 200);
        } catch (error) {
          return new Response('Error in The Use webhook', {
            status: 500,
          });
        }
      }
    }

    // alert
    console.log('Status "READY_TO_SHIP" berhasil dibuat dan diupdate.');
  }
}

export default function Order() {
  const data = useLoaderData<typeof loader>();

  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder cardProduct={data} />
      </Flex>
    </ImplementGrid>
  );
}
