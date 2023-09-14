import { Flex } from '@chakra-ui/react';
import NavigationAdmin from '~/components/NavigationAdmin';
import { ImplementGrid } from '~/layouts/Grid';

export default function DashboardAdmin() {
  return (
    <ImplementGrid>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <NavigationAdmin />
      </Flex>
    </ImplementGrid>
  );
}
