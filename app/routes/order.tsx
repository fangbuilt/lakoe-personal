import { useLoaderData } from '@remix-run/react';
import CardProducts from '~/components/CardProduct';
import { ImplementGrid } from '~/layouts/Grid';
import { getProductUnpid } from '~/modules/order/order.service';
export async function loader() {
  const datas = await getProductUnpid();
  return datas;
}

export default function Order() {
  const datas = useLoaderData<typeof loader>();
  return (
    <ImplementGrid>
      {datas.map((item) => (
        <CardProducts key={item.id} {...item} />
      ))}
    </ImplementGrid>
  );
}
