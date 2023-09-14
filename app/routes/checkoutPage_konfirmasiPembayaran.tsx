import { Container } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import PaymentConfirmation from '~/components/buyer/buyer';
import { createConfirmationPayment } from '~/modules/order/order.service';

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const data = {
      id: formData.get('id') as string,
      cart: formData.get('cart') as string,
      cartId: formData.get('cartId') as string,
      bankAccount: formData.get('bankAccount') as string | undefined,
      bankAccountId: formData.get('bankAccountId') as string,
      amount: parseFloat(formData.get('amount') as string),
      attachment: formData.get('attachment') as string,
      attachmentId: formData.get('attachmentId') as string,
      createdAt: formData.get('createdAt') as string,
      updatedAt: formData.get('updatedAt') as string,
    };

    try {
      console.log(data);
      await createConfirmationPayment(data);

      return null;
    } catch (error) {
      console.error(error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  return null;
}
export default function checkoutPage_konfirmasiPembayaran() {
  return (
    <>
      <Container>
        <PaymentConfirmation />
      </Container>
    </>
  );
}
