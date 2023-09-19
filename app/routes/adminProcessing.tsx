import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import AdminProcessing from '~/components/AdminProcessing';
import { ImplementGridAdmin } from '~/layouts/Grid';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getWithdrawalList();
}

export default function DasboardAdminProcessing() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdmin>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminProcessing dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdmin>
  );
}
