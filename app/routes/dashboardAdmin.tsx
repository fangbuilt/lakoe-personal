import { Flex } from '@chakra-ui/react';
import AdminAll from '~/components/AdminAll';
import { ImplementGrid } from '~/layouts/Grid';

export default function DashboardAdmin() {
  return (
    <ImplementGrid>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminAll />
      </Flex>
    </ImplementGrid>
  );
}
