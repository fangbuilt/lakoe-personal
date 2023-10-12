import { Flex } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import AdminDeclined from '~/components/AdminDeclined';
import { ImplementGridAdminWithdraw } from '~/layouts/Grid';
import { authorize } from '~/middleware/authorization';
import {
  createDeclinedReason,
  getReasonDeclined,
} from '~/modules/dashboard/dashboard.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '1');

  return await getReasonDeclined();
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const actionType = formData.get('actionType');
  const withdrawId = formData.get('withdrawId');
  const storeId = formData.get('storeId');
  const bankAccountId = formData.get('bankAccountId');
  const reason = formData.get('reason');

  if (
    actionType === 'create' &&
    withdrawId &&
    storeId &&
    bankAccountId &&
    reason
  ) {
    try {
      const createReasonResult = await createDeclinedReason(
        {
          reason: reason as string,
        },
        withdrawId as string,
        storeId as string,
        bankAccountId as string
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
    <ImplementGridAdminWithdraw>
      <Flex h={'100vh'} width={'100%'} bg={'yellow'}>
        <AdminDeclined dataDeclined={dataDeclined} />
      </Flex>
    </ImplementGridAdminWithdraw>
  );
}
