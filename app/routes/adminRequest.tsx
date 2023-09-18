import { Flex } from '@chakra-ui/react';
import AdminRequest from '~/components/AdminRequest';
import { ImplementGridRequest } from '~/layouts/Grid';

export default function DasboardAdminRequest() {
  return (
    <ImplementGridRequest>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminRequest />
      </Flex>
    </ImplementGridRequest>
  );
}
