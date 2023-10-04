import { Flex, Heading } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import { redirect } from '@remix-run/node';

export async function loader() {
  return redirect(`/configuration/storeConfiguration`);
}

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
