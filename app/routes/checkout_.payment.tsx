import { Container } from '@chakra-ui/react';
// import { db } from '~/libs/prisma/db.server';
// import type { ActionArgs } from '@remix-run/node';
// import PaymentConfirmation from '~/components/buyer/buyer';
import PaymentConfirmation from '../components/buyer/buyer';
import React from 'react';

// export async function action({ request }: ActionArgs) {
//   if (request.method.toLowerCase() === 'post') {
//     const formData = await request.formData();

//     const orderId = formData.get('orderId') as string;
//     const accountName = formData.get('accountName') as string;
//     const transferTo = formData.get('transferTo') as string;
//     const transferAmount = formData.get('transferAmount') as string;
//     const transferDate = formData.get('transferDate') as string;
//     const buktiTransfer = formData.get('buktiTransfer') as string;

//     const data = {
//       orderId,
//       accountName,
//       transferTo,
//       transferAmount,
//       transferDate,
//       buktiTransfer,
//     };

//     await db.payment.create({ data });
//   }

//   return null;
// }

export default function checkoutPage_konfirmasiPembayaran() {
  return (
    <>
      <Container>
        <PaymentConfirmation />
      </Container>
    </>
  );
}
