import { Flex, Heading } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';

export default function Configuration() {
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} px={5} h={'100vh'}>
        <Heading textAlign={'center'}>This is Configuration's Route</Heading>
        <Outlet />
      </Flex>
    </ImplementGrid>
  );
}
