import { Flex } from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminSuccess from '~/components/AdminSuccess';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import { getWithdrawalList } from '~/modules/dashboard/dashboard.service';

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

export default function DasboardAdminSuccess() {
  const dataWithdrawal = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminWithdraw>
      <Flex h={'100vh'} width={'100%'}>
        <AdminSuccess dataWithdrawal={dataWithdrawal} />
      </Flex>
    </ImplementGridAdminWithdraw>
  );
}
