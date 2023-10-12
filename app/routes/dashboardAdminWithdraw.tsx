import { Flex } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminAll from '~/components/AdminAll';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { authorize } from '~/middleware/authorization';
import {
  getWithdrawalList,
  updateStatusWithdraw,
} from '~/modules/dashboard/dashboard.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '1');

  return await getWithdrawalList();
}

export async function Action({ request }: ActionArgs) {
  const formData = await request.formData();
  const id = formData.get('id');
  const status = formData.get('status');
  const actionType = formData.get('actionType');

  if (actionType === 'update' && status) {
    try {
      const updateStatus = await updateStatusWithdraw(
        id as string,
        status as string
      ); // Pass both id and status
      console.log('Status updated successfully:', updateStatus);
      // Handle success
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
  return redirect('/dashboardAdmin');
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
      ); // Pass both id and status
      console.log('Status updated successfully:', updateStatus);
      // Handle success
    } catch (error) {
      console.error('Error updating status:', error);
      throw error;
    }
  }
  return redirect('/adminProcessing');
}

export default function DashboardAdminWithdraw() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminWithdraw>
      <Flex h={'100vh'} width={'100%'}>
        <AdminAll dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminWithdraw>
  );
}
