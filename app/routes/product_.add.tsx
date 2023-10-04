import { Stack } from '@chakra-ui/react';
import { type LoaderArgs, type ActionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import { Action } from '~/modules/product/components/Action';
import { Price } from '~/modules/product/components/Price';
import { ProductDetail } from '~/modules/product/components/ProductDetail';
import { ProductInformation } from '~/modules/product/components/ProductInformation';
import { ProductManagement } from '~/modules/product/components/ProductManagement';
import { ProductVariant } from '~/modules/product/components/ProductVariant';
import { WeightAndShipment } from '~/modules/product/components/WeightAndShipment';
import { createProduct } from '~/modules/product/product.service';

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

  const CLOUDINARY_UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET as string;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;

  const storeId = role?.storeId as string;

  return {

    storeId,
    ENV: {
      CLOUDINARY_UPLOAD_PRESET,
      CLOUDINARY_CLOUD_NAME
    }
  }


}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {

    const formData = await request.formData();

    const imageUrl = formData.get('mainPhoto') as string;
    const imageUrl2 = formData.get('photo2') as string;
    const imageUrl3 = formData.get('photo3') as string;
    const imageUrl4 = formData.get('photo4') as string;
    const imageUrl5 = formData.get('photo5') as string;

    const storeId = formData.get('storeId') as string;

    const data = {
      url1: imageUrl,
      url2: imageUrl2,
      url3: imageUrl3,
      url4: imageUrl4,
      url5: imageUrl5,
      name: formData.get('name'),
      description: formData.get("description") as string,
      minimumOrder: Number(formData.get('min_order')),
      price: parseFloat(formData.get('price') as string),
      stock: parseInt(formData.get('stock') as string),
      sku: formData.get('sku'),
      price2: parseFloat(formData.get('price-variant') as string),
      stock2: parseInt(formData.get('stock-variant') as string),
      weight2: parseInt(formData.get('weight-variant') as string),
      sku2: formData.get('sku-variant'),
      slug: formData.get('url'),
      category: formData.get('category') as string,
      weight: parseInt(formData.get('weight') as string),
      length: parseFloat(formData.get('length') as string),
      width: parseFloat(formData.get('width') as string),
      height: parseFloat(formData.get('height') as string),
    };


    await createProduct(data, storeId);
    return redirect('/product');
  }
  return null;
}


export default function AddProduct() {

  const data = useLoaderData<typeof loader>();

  return (
    <ImplementGrid>
      <Form method="post" encType="multipart/form-data">
        <Stack mt={'7.5vh'} spacing={4}>
          <ProductInformation />
          <ProductDetail />
          <input type="text" name='storeId' value={data.storeId} hidden readOnly />
          <ProductVariant />
          <Price />
          <ProductManagement />
          <WeightAndShipment />
          <Action />
        </Stack>
      </Form>
    </ImplementGrid>
  );
}
