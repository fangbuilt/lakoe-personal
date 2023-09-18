import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import AdminAll from '~/components/AdminAll';
import { ImplementGrid } from '~/layouts/Grid';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getWithdrawalList();
}

export default function DashboardAdmin() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminAll dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGrid>
  );
}
