import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';

import crypto from 'crypto';
import {
  MootaOrderStatusUpdate,
  getAllProductUnpid,
  getProductUnpid,
} from '~/modules/order/order.service';
import { type ActionArgs, json } from '@remix-run/node';
import { MootaOrderSchema } from '~/modules/order/order.schema';

export async function loader() {
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

export default function Order() {
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder />
      </Flex>
    </ImplementGrid>
  );
}
