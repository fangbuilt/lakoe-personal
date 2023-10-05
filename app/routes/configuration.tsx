import { Flex, Heading } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { getUserId } from '~/modules/auth/auth.service';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/auth/login');
  }

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
