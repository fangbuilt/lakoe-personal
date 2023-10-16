import crypto from 'crypto';

import { json, redirect } from '@remix-run/node';
import type { LoaderArgs, ActionArgs } from '@remix-run/node';

import { MootaOrderSchema } from '~/modules/order/order.schema';

import {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getDataProductReadyToShip,
  getInvoiceByStatus,
  updateInvoiceStatus,
  CanceledService,
  SuccessService,
  getTemplateMessage,
  getProductUnpid,
  whatsappTemplateDb,
  getDataInShipping,
} from '~/modules/order/order.service';

import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { authorize } from '~/middleware/authorization';
import { getUserId } from '~/modules/auth/auth.service';
import SuccesService from '~/modules/order/orderSuccessService';
import { NavOrder } from '~/layouts/NavOrder';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/auth/login');
  }

  const apiKey = process.env.BITESHIP_API_KEY;

  const currentTime = new Date().getTime();
  // const dataProductReadyToShip = await getDataProductReadyToShip();
  //jangan ampai terbalik posisi untuk menampilkan data load
  const [
    unpaidCardAll,
    unpaidCard,
    canceledService,
    getTemplateMessages,
    dataProductReadyToShip,
    succesService,
    whatsappTemplateDbs,
    getDataInShippings,
    dataInvoice,
  ] = await Promise.all([
    getAllProductUnpid(),
    getProductUnpid(),
    CanceledService(),
    getTemplateMessage(),
    getDataProductReadyToShip(),
    SuccesService(),
    whatsappTemplateDb(),
    getDataInShipping(),
    getInvoiceByStatus(),
  ]);

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
      getTemplateMessages,
      dataProductReadyToShip,
      succesService,
      whatsappTemplateDbs,
      SuccessService,
      getDataInShippings,
      dataInvoice,
      currentTime,
      dataShipping: await getDataInShipping(),
      apiKey,
    });
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
}

export async function action({ request }: ActionArgs) {
  const requestIP = request.headers.get('x-forwarded-for') as string;

  if (isMootaIP(requestIP)) {
    if (request.method === 'POST') {
      try {
        const requestBody = await request.text();

        const payloads = JSON.parse(requestBody);
        console.log('payloads', payloads);

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

        return json({ data: payloads }, 200);
      } catch (error) {
        return new Response('Error in The Use webhook', {
          status: 500,
        });
      }
    }
  }
  const formData = await request.formData();
  const id = formData.get('id') as string;
  const status = formData.get('status') as string;
  const actionType = formData.get('actionType') as string;

  const invoiceId = String(formData.get('invoiceId'));
  const userId = '2';
  const now = new Date();

  // Calculate the timestamp 30 minutes in the future
  const nextAccessTime = new Date(now.getTime() + 100000);

  if (actionType === 'createTrackingLimit') {
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

    return json({ message: 'data added.' });
  }

  if (actionType === 'updateInvoiceAndHistoryStatusReadyToShip') {
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
  }

  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    const price = formData.get('price');
    const stock = formData.get('stock');

    await updateInvoiceStatus({ id, price, stock });
  }
  return redirect('/order');
}

function isMootaIP(requestIP: string) {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || [];
  const allowedIPSandBox = process.env.ALLOWED_IPS_SAND?.split(',') || [];
  return allowedIPs.includes(requestIP) || allowedIPSandBox.includes(requestIP);
}
function verifySignature(secretKey: string, data: string, signature: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  const computedSignature = hmac.update(data).digest('hex');
  return computedSignature === signature;
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
