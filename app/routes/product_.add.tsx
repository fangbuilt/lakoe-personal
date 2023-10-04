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
import { LazyProductVariant } from '~/modules/product/components/ProductVariant';
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

    // const imageUrl = formData.get('mainPhoto') as string;
    // const imageUrl2 = formData.get('photo2') as string;
    // const imageUrl3 = formData.get('photo3') as string;
    // const imageUrl4 = formData.get('photo4') as string;
    // const imageUrl5 = formData.get('photo5') as string;

    const storeId = formData.get('storeId') as string;

    const getValue = (fieldName: string): string => {
      const value = formData.get(fieldName);
      return typeof value === 'string' ? value : '';
    };

    const variants = [];
    for (let c = 0; c < 2; c++) {
      for (let i = 0; i < 2; i++) {

        const variantPrice = parseFloat(getValue(`variants[${c}][${i}][price]`));
        const variantStock = parseInt(getValue(`variants[${c}][${i}][stock]`));
        const variantSku = formData.get(`variants[${c}][${i}][sku]`);
        const variantWeight = parseInt(getValue(`variants[${c}][${i}][weight]`));

        variants.push({
          price: variantPrice,
          stock: variantStock,
          sku: variantSku,
          weight: variantWeight,
        });
      }
    }

    console.log("jjhjh", variants);




    const data = {
      url1: getValue('mainPhoto'),
      url2: getValue('photo2'),
      url3: getValue('photo3'),
      url4: getValue('photo4'),
      url5: getValue('photo5'),
      name: getValue('name'),
      description: getValue('description'),
      minimumOrder: Number(getValue('min_order')),
      variants: variants,
      // price2: parseFloat(formData.get('price-variant') as string),
      // stock2: parseInt(formData.get('stock-variant') as string),
      // weight2: parseInt(formData.get('weight-variant') as string),
      // sku2: formData.get('sku-variant'),

      slug: formData.get('url'),
      category: formData.get('category') as string,
      length: parseFloat(formData.get('length') as string),
      width: parseFloat(formData.get('width') as string),
      height: parseFloat(formData.get('height') as string),
    };

    console.log("ini datanya", data.variants);

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
          <LazyProductVariant />
          <Price />
          <ProductManagement />
          <WeightAndShipment />
          <Action />
        </Stack>
      </Form>
    </ImplementGrid>
  );
}
