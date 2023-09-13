import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';
// import { useLoaderData } from '@remix-run/react';
import { getAllProductUnpid } from '~/modules/order/order.service';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  const payments = await getAllProductUnpid();
  console.log('test', payments);

  return payments;
}
export default function Order() {
  const data = useLoaderData<typeof loader>();
  console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data);

  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder />
      </Flex>
    </ImplementGrid>
  );
}
