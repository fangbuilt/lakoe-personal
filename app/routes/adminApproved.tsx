import { Flex } from '@chakra-ui/react';
import {
  redirect,
  type ActionArgs,
  type DataFunctionArgs,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminApproved from '~/components/AdminApproved';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { authorize } from '~/middleware/authorization';
import {
  createDeclinedReason,
  getWithdrawalList,
  updateStatusWithdraw,
} from '~/modules/dashboard/dashboard.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '1');

  return await getWithdrawalList();
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const status = formData.get('status');
  const actionType = formData.get('actionType');

  if (actionType === 'update' && status) {
    try {
      const updateStatus = await updateStatusWithdraw(
        id as string,
        status as string
      );
      console.log('Status updated successfully:', updateStatus);
    } catch (error) {
      console.error('Error updating status:', error);
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
  return redirect('/adminApproved');
}

export default function DasboardAdminApproved() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminWithdraw>
      <Flex h={'100vh'} width={'100%'}>
        <AdminApproved dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminWithdraw>
  );
}
