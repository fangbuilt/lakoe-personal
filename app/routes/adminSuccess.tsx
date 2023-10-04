import { Flex } from '@chakra-ui/react;
import type { DataFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminSuccess from '~/components/AdminSuccess';
import { ImplementGridAdmin } from '~/layouts/Grid';
import { authorize } from '~/middleware/authorization';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '1');

  return await getWithdrawalList();
}

export default function DasboardAdminSuccess() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdmin>
      <Flex h={'100vh'} width={'100%'}>
        <AdminSuccess dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdmin>
  );
}
