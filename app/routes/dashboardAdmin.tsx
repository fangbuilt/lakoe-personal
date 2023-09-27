import { Flex } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminAll from '~/components/AdminAll';
import { ImplementGridAdmin } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import {
  getWithdrawalList,
  updateStatusWithdraw,
} from '~/modules/dashboard/dashboard.service';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/auth/login');
  }

  const role = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  if (role?.roleId === '1') {
    return await getWithdrawalList();
  } else if (role?.roleId === '2') {
    return redirect('/dashboard');
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
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

export default function DashboardAdmin() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdmin>
      <Flex h={'100vh'} width={'100%'}>
        <AdminAll dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdmin>
  );
}
