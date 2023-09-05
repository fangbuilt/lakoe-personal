import { Stack } from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { Action } from '~/modules/product/components/Action';
import { Price } from '~/modules/product/components/Price';
import { ProductDetail } from '~/modules/product/components/ProductDetail';
import { ProductInformation } from '~/modules/product/components/ProductInformation';
import { ProductManagement } from '~/modules/product/components/ProductManagement';
import { ProductVariant } from '~/modules/product/components/ProductVariant';
import { WeightAndShipment } from '~/modules/product/components/WeightAndShipment';

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  if (request.method.toLowerCase() === 'post') {
    console.log('apa', Object.fromEntries(formData));
  }
  return null;
}

export default function AddProduct() {
  return (
    <ImplementGrid>
      <Stack mt={'7.5vh'} spacing={4}>
        <Form method="post">
          <ProductInformation />
          <ProductDetail />
          <ProductVariant />
          <Price />
          <ProductManagement />
          <WeightAndShipment />
          <Action />
        </Form>
      </Stack>
    </ImplementGrid>
  );
}
