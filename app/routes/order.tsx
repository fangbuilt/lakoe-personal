import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';
// import { useLoaderData } from '@remix-run/react';
import {
  getAllProductUnpid,
  getProductUnpid,
} from '~/modules/order/order.service';
import { json } from '@remix-run/node';

export async function loader() {
  const [unpaidCard, unpaidCardAll] = await Promise.all([
    getAllProductUnpid(),
    getProductUnpid(),
  ]);
  return json({ unpaidCard, unpaidCardAll });
  // const payments = await getAllProductUnpid();
  // const payment = await getProductUnpid();
  // return {payments, payment};
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
