import { Stack } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect, json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { ITracking } from '~/interfaces/order/orderTracking';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import { ImplementGrid } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
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
  const currentTime = new Date().getTime();

  return { dataCart, apiKey, currentTime };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const actionType = formData.get('actionType') as string;

  const invoiceId = String(formData.get('invoiceId'));
  const userId = '2';
  const now = new Date();

  if (
    request.method.toLowerCase() === 'patch' &&
    actionType === 'afterPacking'
  ) {
    const status = formData.get('status') as string;
    const id = formData.get('id') as string;

    const validateDataUpdate = {
      id,
      status,
    };

    await updateStatusInvoice(validateDataUpdate);
    return redirect('/order/detail/' + id);
  }

  if (request.method.toLowerCase() === 'post' && actionType === 'cancelNotif') {
    const status = formData.get('status') as string;
    const id = formData.get('id') as string;

    const validateDataUpdate = {
      id,
      status,
    };

    await updateStatusInvoice2(validateDataUpdate);
    return redirect('/order/detail/' + id);
  }

  if (actionType === 'createTrackingLimit') {
    // Calculate the timestamp 30 minutes in the future
    const nextAccessTime = new Date(now.getTime() + 10000);
    const data = {
      userId,
      invoiceId,
      nextAccessTime,
      updatedAt: now,
    };

    // await db.biteshipTrackingLimit.deleteMany({
    //   where: {
    //     invoiceId: invoiceId
    //   }
    // })

    const isAvailable = await db.biteshipTrackingLimit.findFirst({
      where: {
        invoiceId: invoiceId,
      },
    });

    if (isAvailable) {
      await db.biteshipTrackingLimit.update({
        where: {
          id: isAvailable.id,
        },
        data: {
          nextAccessTime: nextAccessTime,
        },
      });
    } else {
      await db.biteshipTrackingLimit.create({ data });
    }

    // await db.biteshipTrackingLimit.create({data})

    return json({ message: 'data added.' });
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
