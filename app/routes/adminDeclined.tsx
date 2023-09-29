import { Flex } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminDeclined from '~/components/AdminDeclined';
import { ImplementGridAdmin } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import {
  createDeclinedReason,
  getReasonDeclined,
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
    return await getReasonDeclined();
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

  const actionType = formData.get('actionType');
  const withdrawId = formData.get('withdrawId');
  const storeId = formData.get('storeId');
  const reason = formData.get('reason');

  if (actionType === 'create' && withdrawId && storeId && reason) {
    try {
      const createReasonResult = await createDeclinedReason(
        {
          reason: reason as string,
        },
        withdrawId as string,
        storeId as string
      );
      console.log('This is the declined reason', createReasonResult);
    } catch (error) {
      console.error('Error creating declined reason:', error);
    }
  }

  return redirect('/adminDeclined');
}

export default function DasboardAdminDeclined() {
  const dataDeclined = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdmin>
      <Flex h={'100vh'} width={'100%'} bg={'yellow'}>
        <AdminDeclined dataDeclined={dataDeclined} />
      </Flex>
    </ImplementGridAdmin>
  );
}
