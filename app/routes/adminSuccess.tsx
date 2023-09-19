import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import AdminSuccess from '~/components/AdminSuccess';
import { ImplementGrid } from '~/layouts/Grid';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getWithdrawalList();
}

export default function DasboardAdminSuccess() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminSuccess dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGrid>
  );
}
