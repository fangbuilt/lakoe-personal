import { Flex } from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import ProductBody from '~/components/product/ProductBody';
import type { IProduct } from '~/interfaces/product/product';

export async function loader() {
  const res = await fetch('https://api.npoint.io/ee9d3229a94459dc546b');
  const data = await res.json();
  return data as IProduct[];
}

export default function Product() {
  const items: IProduct[] = useLoaderData();

  return (
    <>
      <ImplementGrid>
        <Flex my={12}>
          <ProductBody items={items} />
        </Flex>
      </ImplementGrid>
    </>
  );
}
