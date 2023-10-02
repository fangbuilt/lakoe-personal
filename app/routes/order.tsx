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
    const bank_id = 'EVPW8V2Vzrw';
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJucWllNHN3OGxsdyIsImp0aSI6IjkxZjc3ZDIxYmZmYTU2M2VmZmYxNWEzYTZhZDg4MTNiZTI4NjQ1ZTZlMjdiYzQzZTM4YjI4MDkyY2MyMGRhOTk3MzdjMTBlNTczYjc1MTM4IiwiaWF0IjoxNjk1ODA2ODgwLjMyNDAxNSwibmJmIjoxNjk1ODA2ODgwLjMyNDAxNywiZXhwIjoxNzI3NDI5MjgwLjMyMTMzMSwic3ViIjoiMzAyNTciLCJzY29wZXMiOlsiYXBpIl19.bGG_k1BqHqIg_-7w-QMXnGWF5IWNkAUm809nVvvjgkUosHv3_2I7xWK6fn_kD7ydel8QmE0hHCO23xwT3rO1lbYPmJcMI3Z69b_A2sH_hc_77fiqQhVBYW7Cfc0XhHltD8G_whW0I_ydEXfXQwfvMSKYVrQTtldPyvfORrndwWnKjXwceqzTomfyuhSNT6ilzG69iWM56-ueYCn8sbGwOcP79L6trKyyXhxjHtfQ-bqItCyVNaIg5fwanS6x7z83fh5z2C5y3WZjLiI3YqKN7bwK023gAWQWEuqwcEoFxrewCzt_jEkuAanpBAg0MvzRJtJMogo63SBxkFHADggdaOFlZRuN_GIzLdPMJ_GmoBSdxZlGAnErCIxTG9C9uYF2WCMU9QqMW-Ou1Thv9QenAPpdPyXC6Md0NkjtA-nKHW5fbfeyp6KJdYsMkETKUKIaGJ1Kk5ef9FBy2NiRgHgDdHu1gMJJJ_861tkcWmleBulAJaS9KOR7a3QHDlilMlL-jkPcix-qeQsR3kEMpSeuVhmRl-Z7NOABS-sy3VVJyuBDHXsoRq_4uxAXvzZn_rZICQPeHZMxjndItQ_enVZPw8_zanEexZWn8OHoi66LesMFokIgdufrm2teLfG7QkGTvjjGar-vzvcIWuiNuXGgb2TG1N2vT20eX_ZHmQWfZio';

    // const url =`https://app.moota.co/api/v2/mutation?bank=${bankId}`;
    const url = `https://app.moota.co/api/v2/mutation?bank=${bank_id}`;

    const headers = {
      Location: '/api/v2/mutation{?bank}',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      const data = await response.json();

      console.log('fetchWebhookStatusWithRetry', data);
      // return data;
    }
  } catch (error) {
    console.error('Kesalahan dalam permintaan API:', error);

    if (retryCount < maxRetryAttempts - 1) {
      // Hitung ulang interval eksponensial
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
