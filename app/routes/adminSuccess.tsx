import { Flex } from '@chakra-ui/react';
import AdminSuccess from '~/components/AdminSuccess';
import { ImplementGridSuccess } from '~/layouts/Grid';

export default function DasboardAdminSuccess() {
  return (
    <ImplementGridSuccess>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminSuccess />
      </Flex>
    </ImplementGridSuccess>
  );
}
