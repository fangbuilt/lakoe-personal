import { Flex } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import React from 'react';
import AdminAllRefund from '~/components/AdminAllRefund';
import { ImplementGridAdminRefund } from '~/layouts/Grid';
import { getRefundData } from '~/modules/dashboard/dashboard.service';

export async function loader() {
  return await getRefundData();
}
// export async function Action({ request }: ActionArgs) {
//   const formData = await request.formData();
//   const id = formData.get('id');
//   const status = formData.get('status');
//   const actionType = formData.get('actionType');

//   if (actionType === 'update' && status) {
//     try {
//       const updateStatus = await updateStatusWithdraw(
//         id as string,
//         status as string
//       ); // Pass both id and status
//       console.log('Status updated successfully:', updateStatus);
//       // Handle success
//     } catch (error) {
//       console.error('Error updating status:', error);
//       throw error;
//     }
//   }
//   return redirect('/dashboardAdmin');
// }

export async function action({ request }: ActionArgs) {
  // const formData = await request.formData();
  // const id = formData.get("id");
  // const status = formData.get("status");
  // const actionType = formData.get("actionType");

  // if (actionType === "update" && status) {
  //   try {
  //     const updateStatus = await updateStatusWithdraw(
  //       id as string,
  //       status as string
  //     ); // Pass both id and status
  //     console.log("Status updated successfully:", updateStatus);
  //     // Handle success
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     throw error;
  //   }
  // }
  return redirect('/dashboardAdminRefund');
}

export default function DashboardAdminRefund() {
  const dataRefund = useLoaderData<typeof loader>();
  return (
    <ImplementGridAdminRefund>
      <Flex h={'100vh'} width={'100%'}>
        <AdminAllRefund dataRefund={dataRefund} />
      </Flex>
    </ImplementGridAdminRefund>
  );
}
