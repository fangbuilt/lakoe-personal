import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import AdminDeclined from '~/components/AdminDeclined';
import { ImplementGridAdminDeclined } from '~/layouts/Grid';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getWithdrawalList();
}

export default function DasboardAdminDeclined() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminDeclined>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminDeclined dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminDeclined>
  );
}
