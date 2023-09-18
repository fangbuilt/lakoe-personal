import { Flex } from '@chakra-ui/react';
import AdminProcessing from '~/components/AdminProcessing';
import { ImplementGridProcess } from '~/layouts/Grid';

export default function DasboardAdminProcessing() {
  return (
    <ImplementGridProcess>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminProcessing />
      </Flex>
    </ImplementGridProcess>
  );
}
