import { Flex } from '@chakra-ui/react';
import ProductBody from '~/components/product/ProductBody';
import { ImplementGrid } from '~/layouts/Grid';

export default function Product() {
  return (
    <ImplementGrid>
      <Flex my={12}>
        <ProductBody />
      </Flex>
    </ImplementGrid>
  );
}
