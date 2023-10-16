import { Input, Stack } from '@chakra-ui/react';
import type { ActionArgs, DataFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { authorize } from '~/middleware/authorization';
import { getUserId } from '~/modules/auth/auth.service';
import { Action } from '~/modules/product/components/Action';
import { Price } from '~/modules/product/components/Price';
import { ProductDetail } from '~/modules/product/components/ProductDetail';
import { ProductInformation } from '~/modules/product/components/ProductInformation';
import { ProductManagement } from '~/modules/product/components/ProductManagement';
import { LazyProductVariant } from '~/modules/product/components/ProductVariant';
import { WeightAndShipment } from '~/modules/product/components/WeightAndShipment';
import { createProduct } from '~/modules/product/product.service';

export async function loader({ request, context, params }: DataFunctionArgs) {
  await authorize({ request, context, params }, '2');
  const userId = await getUserId(request);

  const user = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  const CLOUDINARY_UPLOAD_PRESET = process.env
    .CLOUDINARY_UPLOAD_PRESET as string;
  const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME as string;

  const storeId = user?.storeId as string;

  return {
    storeId,
    ENV: {
      CLOUDINARY_UPLOAD_PRESET,
      CLOUDINARY_CLOUD_NAME,
    },
  };
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const storeId = formData.get('storeId') as string;

    const getValue = (fieldName: string): string => {
      const value = formData.get(fieldName);
      return typeof value === 'string' ? value : '';
    };

    const colorVariantLength = parseInt(getValue('colorVariants'));
    const sizeVariantLength = parseInt(getValue('sizeVariants'));

    const variants = [];
    for (let color = 0; color < colorVariantLength; color++) {
      for (let size = 0; size < sizeVariantLength; size++) {
        const variantName = getValue(`variants[${color}][${size}][name]`);
        const variantPrice = parseFloat(
          getValue(`variants[${color}][${size}][price]`)
        );
        const variantStock = parseInt(
          getValue(`variants[${color}][${size}][stock]`)
        );
        const variantSku = formData.get(`variants[${color}][${size}][sku]`);
        const variantWeight = parseInt(
          getValue(`variants[${color}][${size}][weight]`)
        );

        variants.push({
          name: variantName,
          price: variantPrice,
          stock: variantStock,
          sku: variantSku,
          weight: variantWeight,
        });
      }
    }

    const data = {
      name: getValue('name'),
      url1: getValue('mainPhoto'),
      url2: getValue('photo2'),
      url3: getValue('photo3'),
      url4: getValue('photo4'),
      url5: getValue('photo5'),
      description: getValue('description'),
      minimumOrder: Number(getValue('min_order')),
      variants: variants,
      // price2: parseFloat(formData.get('price') as string),
      // stock2: parseInt(formData.get('stock') as string),
      // weight2: parseInt(formData.get('weight') as string),
      // sku2: formData.get('sku'),
      slug: formData.get('url'),
      category: formData.get('category') as string,
      length: parseFloat(formData.get('length') as string),
      width: parseFloat(formData.get('width') as string),
      height: parseFloat(formData.get('height') as string),
    };

    console.log('ini data', data);

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
          <Input name="storeId" defaultValue={data.storeId} readOnly />
          <ProductInformation />
          <ProductDetail />
          <input
            type="text"
            name="storeId"
            value={data.storeId}
            hidden
            readOnly
          />
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
