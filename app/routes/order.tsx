import { json, type ActionArgs } from '@remix-run/node';
import 'dotenv/config';
import crypto from 'crypto';
import { MootaOrderSchema } from '~/modules/order/order.schema';
import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';

import {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getProductUnpid,
} from '~/modules/order/order.service';

export async function loader() {
  //jangan ampai terbalik posisi untuk menampilkan data load
  const [unpaidCardAll, unpaidCard] = await Promise.all([
    getAllProductUnpid(),
    getProductUnpid(),
  ]);
  return json({ unpaidCardAll, unpaidCard });
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
        console.log('secretKey', secretKey);
        const amount = payloads[0].amount as number;
        console.log('amount', amount);
        const signature = request.headers.get('Signature') as string;
        console.log('signature', signature);

        if (verifySignature(secretKey, requestBody, signature)) {
          const MootaOrder = MootaOrderSchema.parse({
            amount,
          });
          await MootaOrderStatusUpdate(MootaOrder);
        } else {
          console.log('verify Signature gagal!');
        }
        return json({ data: requestBody }, 200);
      } catch (error) {
        return new Response('Error in The Use webhook', {
          status: 500,
        });
      }
    }
  }
}

function isMootaIP(requestIP: string) {
  const allowedIPs = process.env.ALLOWED_IPS?.split(',') || [];
  return allowedIPs.includes(requestIP);
}
function verifySignature(secretKey: string, data: string, signature: string) {
  const hmac = crypto.createHmac('sha256', secretKey);
  const computedSignature = hmac.update(data).digest('hex');
  console.log('computedSignature', computedSignature);
  return computedSignature === signature;
}
export default function Order() {
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder />
      </Flex>
    </ImplementGrid>
  );
}
