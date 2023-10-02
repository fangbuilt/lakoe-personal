import { Stack } from '@chakra-ui/react';
import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import ProductBody from '~/components/product/ProductBody';
import { ImplementGrid } from '~/layouts/Grid';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';
import {
  deleteProduct,
  getProduct,
  update,
} from '~/modules/product/product.service';

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

  if (role?.roleId === '1') {
    return redirect('/dashboardAdmin');
  } else if (role?.roleId === '2') {
    return await getProduct();
  } else if (role?.roleId === '3') {
    return redirect('/checkout');
  } else {
    return redirect('/logout');
  }
}

export async function action({ request }: ActionArgs) {
  if (request.method.toLowerCase() === 'delete') {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const isDeleted = await deleteProduct(id);
    console.log(isDeleted);
  }

  if (request.method.toLowerCase() === 'patch') {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    const price = formData.get('price');
    const stock = formData.get('stock');

    console.log('id', id);
    console.log('price', price);
    console.log('stock', stock);

    await update({ id, price, stock });
  }

  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    await disableProduct(id);
  }

  return redirect('/product');
}

export default function Product() {
  const data = useLoaderData<typeof loader>();

  return (
    <ImplementGrid>
      <Stack mt={'7.5vh'} spacing={4}>
        <ProductBody product={data} />
      </Stack>
    </ImplementGrid>
  );
}
