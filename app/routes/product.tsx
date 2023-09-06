import { Flex, Heading } from '@chakra-ui/react';
import ProductBody from '~/components/product/ProductBody';
import { ImplementGrid } from '~/layouts/Grid';

export default function Product() {
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} px={5} h={'100vh'}>
        <Heading textAlign={'center'}>This is Product's Route</Heading>
        <Flex my={12}>
          <ProductBody />
        </Flex>
      </Flex>
    </ImplementGrid>
  );
}
