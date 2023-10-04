import { Stack } from '@chakra-ui/react';
<<<<<<< HEAD
import { type LoaderArgs, type ActionArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
=======
import type { LoaderArgs, ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
>>>>>>> 6751982d4395ec2b5232b1f183edc4ccd04baa21
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
  redirect,
  json,
} from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
// import { useState } from 'react';

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

<<<<<<< HEAD
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


=======
  if (role?.roleId === '1') {
    return redirect('/dashboardAdmin');
  } else if (role?.roleId === '2') {
    return json({});
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
>>>>>>> 6751982d4395ec2b5232b1f183edc4ccd04baa21
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'post') {
    const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
      if (name !== 'mainPhoto' && name !== 'photo2') {
        return undefined;
      }

      const uploadedImage = await uploadImage(data);

      return uploadedImage.secure_url;
    }, createMemoryUploadHandler());

    const formData = await parseMultipartFormData(request, uploadHandler);
    const imageUrl = formData.get('mainPhoto') as string;
    const imageUrl2 = formData.get('photo2') as string;
<<<<<<< HEAD
    const imageUrl3 = formData.get('photo3') as string;
    const imageUrl4 = formData.get('photo4') as string;
    const imageUrl5 = formData.get('photo5') as string;

    const storeId = formData.get('storeId') as string;
=======
    const height = parseFloat(formData.get('height') as string);
    console.log('image', imageUrl);
    console.log('image2', imageUrl2);
>>>>>>> 6751982d4395ec2b5232b1f183edc4ccd04baa21

    const data = {
      url1: imageUrl,
      url2: imageUrl2,
      name: formData.get('name'),
<<<<<<< HEAD
      description: formData.get("description") as string,
=======
      description: formData.get('description'),
>>>>>>> 6751982d4395ec2b5232b1f183edc4ccd04baa21
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
