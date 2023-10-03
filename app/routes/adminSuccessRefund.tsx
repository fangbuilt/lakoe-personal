import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import AdminSuccessRefund from '~/components/AdminSuccessRefund';
import { ImplementGridAdminRefund } from '~/layouts/Grid';
import { getRefundData } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getRefundData();
}

export default function DasboardAdminSuccessRefund() {
  const dataRefund = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminRefund>
      <Flex h={'100vh'} width={'100%'}>
        <AdminSuccessRefund dataRefund={dataRefund} />
      </Flex>
    </ImplementGridAdminRefund>
  );
}
