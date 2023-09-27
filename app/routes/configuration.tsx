import { Flex, Heading } from '@chakra-ui/react';
import { Outlet } from '@remix-run/react';
import { ImplementGrid } from '~/layouts/Grid';
import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';
import { getUserId } from '~/modules/auth/auth.service';

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (!userId) {
    return redirect('/auth/login');
  }

  const store = await db.user.findFirst({
    where: {
      id: userId as string,
    },
  });

  const storeId = store?.storeId as string;
  return redirect(`/configuration/storeConfiguration/${storeId}`);
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
