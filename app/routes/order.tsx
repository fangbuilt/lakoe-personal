import { Flex } from '@chakra-ui/react';
import NavOrderBa from '~/layouts/NavOrderBa';
import { ImplementGrid } from '~/layouts/Grid';
import {
  getInvoiceByStatus,
  updateInvoiceStatus,
} from '~/modules/order/order.service'; // Menghapus impor updateIsActive
import { useLoaderData } from '@remix-run/react';
import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import CanceledService from '~/modules/order/orderCanceledService';

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    const price = formData.get('price');
    const stock = formData.get('stock');

    await updateInvoiceStatus({ id, price, stock });
  }

  return redirect('/order');
}

export async function loader() {
  const [canceledService] = await Promise.all([
    CanceledService(),
    // ready(),
    //your order service here !
  ]);
  const dataInvoice = await getInvoiceByStatus();

  return json({
    canceledService,
    dataInvoice,
    // your return order service here !
  });
}
export default function Order() {
  const data = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        {/* <NavOrderBa prderDetailInvoice={data} /> */}

        <NavOrderBa orderDetailInvoice={data.dataInvoice} />
      </Flex>
    </ImplementGrid>
  );
}
