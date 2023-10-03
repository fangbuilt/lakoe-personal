import crypto from 'crypto';
import {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getProductUnpid,
  getDataProductReadyToShip,
  getInvoiceByStatus,
  updateInvoiceStatus,
  getTemplateMessage,
} from '~/modules/order/order.service';
import { type ActionArgs, json, redirect } from '@remix-run/node';
import { MootaOrderSchema } from '~/modules/order/order.schema';

import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import NavOrder from '~/layouts/NavOrder';
import CanceledService from '~/modules/order/orderCanceledService';
import getDataInShipping from '~/modules/order/orderShippingService';
import moment from 'moment';

export async function loader() {
  const apiKey = process.env.BITESHIP_API_KEY;
  const dataProductReadyToShip = await getDataProductReadyToShip();
  //jangan ampai terbalik posisi untuk menampilkan data load
  const [unpaidCardAll, unpaidCard, canceledService, getTemplateMessages] =
    await Promise.all([
      getAllProductUnpid(),
      getProductUnpid(),
      CanceledService(),
      getTemplateMessage(),
    ]);
  const dataInvoice = await getInvoiceByStatus();
  return json({
    unpaidCardAll,
    unpaidCard,
    canceledService,
    getTemplateMessages,
    dataInvoice,
    dataShipping: await getDataInShipping(),
    dataProductReadyToShip,
    apiKey,
  });
}

export async function action({ request }: ActionArgs) {
  const data = await fetchWebhookStatusWithRetry();
  console.log('data', data);

  const requestIP = request.headers.get('x-forwarded-for') as string;
  if (isMootaIP(requestIP)) {
    if (request.method === 'POST') {
      try {
        const requestBody = await request.text();
        const payloads = JSON.parse(requestBody);
        // console.log("payloads",payloads)
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
  return allowedIPs.includes(requestIP);
}
function verifySignature(secretKey: string, data: string, signature: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  const computedSignature = hmac.update(data).digest('hex');
  return computedSignature === signature;
}

const maxRetryAttempts = 5;
const baseRetryInterval = 5 * 60 * 1000;
const maxRetryInterval = 24 * 60 * 60 * 1000;

export async function fetchWebhookStatusWithRetry(
  retryCount = 0,
  retryInterval = baseRetryInterval
) {
  try {
    const bank_id = process.env.ID_BANK as string;
    const token = process.env.TOKEN_ACCOUNT_BANK as string;

    const startDate = moment()
      .subtract(1, 'days')
      .format('YYYY-MM-DD') as string;
    const endDate = moment().format('YYYY-MM-DD') as string;

    const url = `https://app.moota.co/api/v2/mutation?bank=${bank_id}&start_date=${startDate}&end_date=${endDate}`;

    const headers = {
      Location: '/api/v2/mutation{?bank}&{?start_date}&{?end_date}',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const responseData = await response.json();

      if (responseData.data && responseData.data.length > 0) {
        // descending date
        responseData.data.sort((a: any, b: any) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        const latestTransaction = responseData.data[0];

        const latestAmount = latestTransaction.amount;
        const latestDescription = latestTransaction.description;
        const latestBalance = latestTransaction.balance;

        console.log('Data Transaksi Terbaru:', latestTransaction);
        console.log('Amount:', latestAmount);
        console.log('Description:', latestDescription);
        console.log('Balance:', latestBalance);
      } else {
        console.log('Tidak ada data transaksi yang ditemukan.');
      }
      return responseData;
    }
  } catch (error) {
    console.error('Kesalahan dalam permintaan API:', error);

    if (retryCount < maxRetryAttempts - 1) {
      //  interval eksponensial
      retryInterval *= 2;
      retryInterval = Math.min(retryInterval, maxRetryInterval);

      console.log(
        `Percobaan ke-${retryCount + 1} akan dilakukan dalam ${
          retryInterval / 1000
        } detik.`
      );
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      return fetchWebhookStatusWithRetry(retryCount + 1, retryInterval);
    } else {
      console.error(
        'Percobaan retry telah mencapai batas. Tidak dapat mengambil status webhook.'
      );
      throw new Error('Percobaan retry telah mencapai batas.');
    }
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
