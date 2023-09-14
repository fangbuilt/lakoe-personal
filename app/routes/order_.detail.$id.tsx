import { Stack } from '@chakra-ui/react';
<<<<<<< HEAD
import type { LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import { ImplementGrid } from '~/layouts/Grid';
import StatusOrderDetail from '~/modules/order/components/statusOrderDetail';
import { getInvoiceById } from '~/modules/order/order.service';

export async function loader({ params }: LoaderArgs) {
  const { id } = params;

  try {
    const dataCart = await getInvoiceById(id as string);
    return dataCart;
  } catch (error) {
    console.error('Loader error:', error);
    throw error;
  }
}
=======
import { ImplementGrid } from '~/layouts/Grid';
import StatusOrderDetail from '~/modules/order/components/statusOrderDetail';
>>>>>>> 0aa73c4d167d6e7d3ba456e0ea46edffec25ee63

export default function OrderDetailId() {
  const data = useLoaderData<IOrderDetailInvoice>();
  return (
    <>
      <ImplementGrid>
        <Stack mt={'7.5vh'} spacing={4}>
<<<<<<< HEAD
          <StatusOrderDetail data={data} />
=======
          <StatusOrderDetail />
>>>>>>> 0aa73c4d167d6e7d3ba456e0ea46edffec25ee63
        </Stack>
      </ImplementGrid>
    </>
  );
}
