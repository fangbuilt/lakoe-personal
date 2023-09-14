import { Flex } from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';
import { getInvoiceByStatus } from '~/modules/order/order.service';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
  const dataInvoice = await getInvoiceByStatus(status);

  return dataInvoice;
}

export default function Order() {
  const data = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder jancok={data} />
      </Flex>
    </ImplementGrid>
  );
}
