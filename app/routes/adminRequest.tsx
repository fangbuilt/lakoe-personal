import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import AdminRequest from '~/components/AdminRequest';
import { ImplementGridAdminRequest } from '~/layouts/Grid';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getWithdrawalList();
}

export default function DasboardAdminRequest() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminRequest>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminRequest dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminRequest>
  );
}
