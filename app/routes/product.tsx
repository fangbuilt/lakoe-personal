import { Flex } from '@chakra-ui/react';
import ProductBody from '~/components/product/ProductBody';
import { ImplementGrid } from '~/layouts/Grid';

export default function Product() {
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} px={5} h={'100vh'}>
        <ProductBody />
      </Flex>
    </ImplementGrid>
  );
}
