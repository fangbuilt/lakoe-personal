import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import AdminSuccessRefund from '~/components/AdminSuccessRefund';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getWithdrawalList();
}

export default function DasboardAdminSuccessRefund() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminWithdraw>
      <Flex h={'100vh'} width={'100%'}>
        <AdminSuccessRefund dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminWithdraw>
  );
}
