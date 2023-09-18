import { Flex } from '@chakra-ui/react';
import AdminAll from '~/components/AdminAll';
import { ImplementGridAll } from '~/layouts/Grid';

export default function DashboardAdmin() {
  return (
    <ImplementGridAll>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminAll />
      </Flex>
    </ImplementGridAll>
  );
}
