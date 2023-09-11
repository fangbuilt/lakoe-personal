import { Stack } from '@chakra-ui/react';
import { type ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { Action } from '~/modules/product/components/Action';
import { Price } from '~/modules/product/components/Price';
import { ProductDetail } from '~/modules/product/components/ProductDetail';
import { ProductInformation } from '~/modules/product/components/ProductInformation';
import { ProductManagement } from '~/modules/product/components/ProductManagement';
import { ProductVariant } from '~/modules/product/components/ProductVariant';
import { WeightAndShipment } from '~/modules/product/components/WeightAndShipment';
import { createProduct } from '~/modules/product/product.service';
import { uploadImage } from '~/utils/uploadImage';
import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as parseMultipartFormData,
} from '@remix-run/node';

export async function action({ request }: ActionArgs) {
  // const formData = await request.formData();

  const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
    if (name !== 'product-image') {
      return undefined;
    }

    const uploadedImage = await uploadImage(data);

    return uploadedImage.secure_url;
  }, createMemoryUploadHandler());

  const formData = await parseMultipartFormData(request, uploadHandler);

  const imageUrl = formData.get('product-image') as string;
  const categori = formData.get('product-category') as string;
  console.log('imag', imageUrl);

  if (request.method.toLowerCase() === 'post') {
    const data = {
      name: formData.get('product-name'),
      description: formData.get('product-description'),
      attachments: [imageUrl],
      minumumOrder: Number(formData.get('product-min-order')),
      price: parseFloat(formData.get('product-price') as string),
      stock: parseInt(formData.get('product-stock') as string),
      sku: formData.get('product-sku'),
      slug: formData.get('product-url'),
      category: categori,
      weight: parseInt(formData.get('product-weight') as string),
      length: parseFloat(formData.get('product-length') as string),
      width: parseFloat(formData.get('product-width') as string),
      height: parseFloat(formData.get('product-height') as string),
    };
    const newProduct = await createProduct(data, '1');

    return newProduct;
  }
  return null;
}

export default function AddProduct() {
  return (
    <ImplementGrid>
      <Stack mt={'7.5vh'} spacing={4}>
        <Form method="post" encType="multipart/form-data">
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
