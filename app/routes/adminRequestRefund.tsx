import { Flex } from '@chakra-ui/react';
import { redirect, type ActionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminRequestRefund from '~/components/AdminRequestRefund';
import { ImplementGridAdminRefund } from '~/layouts/Grid';
import {
  createDeclinedReason,
  getRefundData,
  updateStatusRefund,
} from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getRefundData();
}
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const status = formData.get('status');
  const actionType = formData.get('actionType');

  if (actionType === 'update' && status) {
    try {
      const updateStatus = await updateStatusRefund(
        id as string,
        status as string
      ); // Pass both id and status
      console.log('Status Refund updated successfully:', updateStatus);
      // Handle success
    } catch (error) {
      console.error('Error Refund updating status:', error);
      throw error;
    }
  }
  const withdrawId = formData.get('withdrawId');
  const storeId = formData.get('storeId');
  const bankAccountId = formData.get('bankAccountId');
  const reason = formData.get('reason');

  if (
    actionType === 'create' &&
    withdrawId &&
    storeId &&
    bankAccountId &&
    reason
  ) {
    try {
      const createReasonResult = await createDeclinedReason(
        {
          reason: reason as string,
        },
        withdrawId as string,
        storeId as string,
        bankAccountId as string
      );
      console.log('This is the declined reason', createReasonResult);
    } catch (error) {
      console.error('Error creating declined reason:', error);
    }
  }
  return redirect('/adminApprovedRefund');
}

export default function DasboardAdminRequestRefund() {
  const dataRefund = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminRefund>
      <Flex h={'100vh'} width={'100%'}>
        <AdminRequestRefund dataRefund={dataRefund} />
      </Flex>
    </ImplementGridAdminRefund>
  );
}
