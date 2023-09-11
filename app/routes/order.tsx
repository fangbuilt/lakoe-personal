import { useLoaderData } from '@remix-run/react';
import CardProducts from '~/components/CardProduct';
import { ImplementGrid } from '~/layouts/Grid';
import { getProductUnpid } from '~/modules/order/order.service';
export async function loader() {
  const datas = await getProductUnpid();
  return datas;
}

export default function Order() {
  const datas = useLoaderData<typeof loader>() as unknown as any;
  return (
    <ImplementGrid>
      {datas.map((item: any) => (
        <CardProducts key={item.id} {...item} />
      ))}
    </ImplementGrid>
  );
}
