import { Flex } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import NavOrder from '~/layouts/NavOrder';
// import NavOrderBa from '~/layouts/NavOrderBa';
import {
  getDataProductReadyToShip,
  getInvoiceByStatus,
  updateInvoiceStatus,
} from '~/modules/order/order.service'; // Menghapus impor updateIsActive
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
  const api_key = process.env.API_LAKOE_TEST;
  const dataProductReadyToShip = await getDataProductReadyToShip();

  const [canceledService] = await Promise.all([
    CanceledService(),
    // ready(),
    //your order service here !
  ]);
  const dataInvoice = await getInvoiceByStatus();

  return json({
    canceledService,
    dataInvoice,
    dataProductReadyToShip,
    api_key,
    // your return order service here !
  });
}
export default function Order() {
  const data = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder cardProduct={data.dataProductReadyToShip} />
        {/* <NavOrderBa orderDetailInvoice={data.dataInvoice} /> */}
      </Flex>
    </ImplementGrid>
  );
}
