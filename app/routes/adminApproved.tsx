import { Flex } from '@chakra-ui/react';
import { redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import AdminApproved from '~/components/AdminApproved';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import {
  createDeclinedReason,
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
