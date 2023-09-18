import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';
import CanceledService, { ready } from '~/modules/order/orderCanceledService';
import { useLoaderData } from '@remix-run/react';
import { json } from '@remix-run/node';

export async function loader() {
  const [canceledService, readyService] = await Promise.all([
    CanceledService(),
    ready(),
    //your order service here !
  ]);
  return json({
    canceledService,
    readyService,
    // your return order service here !
  });
}
export default function Order() {
  const allOrderServices = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder order={allOrderServices} />
      </Flex>
    </ImplementGrid>
  );
}
