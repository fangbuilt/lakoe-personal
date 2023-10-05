import { Stack } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { ITracking } from '~/interfaces/order/orderTracking';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import { ImplementGrid } from '~/layouts/Grid';
import { authorize } from '~/middleware/authorization';
import StatusOrderDetail from '~/modules/order/components/statusOrderDetail';
import {
  getInvoiceById,
  updateStatusInvoice,
  updateStatusInvoice2,
} from '~/modules/order/order.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '2');

  const { id } = params;

  const apiKey = process.env.BITESHIP_API_KEY as string;
  const dataCart = await getInvoiceById(id as string);

  return { dataCart, apiKey };
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData();
    const status = formData.get('status') as string;
    const id = formData.get('id') as string;

    const validateDataUpdate = {
      id,
      status,
    };

    await updateStatusInvoice(validateDataUpdate);
    return redirect('/order/detail/' + id);
  }

  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();
    const status = formData.get('status') as string;
    const id = formData.get('id') as string;

    const validateDataUpdate = {
      id,
      status,
    };

    await updateStatusInvoice2(validateDataUpdate);
    return redirect('/order/detail/' + id);
  }
}

export default function OrderDetailId() {
  const { dataCart, apiKey, dataTracking } = useLoaderData<{
    dataCart: IOrderDetailInvoice;
    dataTracking: ITracking;
    apiKey: string;
  }>();

  return (
    <>
      <ImplementGrid>
        <Stack mt={'7.5vh'} spacing={4}>
          <StatusOrderDetail
            data={dataCart}
            dataTracking={dataTracking}
            apiKey={apiKey}
          />
        </Stack>
      </ImplementGrid>
    </>
  );
}
