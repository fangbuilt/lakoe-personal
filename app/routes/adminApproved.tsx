import { Flex } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminApproved from '~/components/AdminApproved';
import { ImplementGridAdmin } from '~/layouts/Grid';
import {
  getWithdrawalList,
  updateStatusWithdraw,
} from '~/modules/dashboard/dashboard.service';

export async function loader() {
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
  return redirect('/adminProcessing');
}

export default function DasboardAdminRequest() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdmin>
      <Flex h={'100vh'} width={'100%'}>
        <AdminApproved dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdmin>
  );
}
