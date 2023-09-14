import { Flex } from '@chakra-ui/react';
import AdminDeclined from '~/components/AdminDeclined';
import { ImplementGridDeclined } from '~/layouts/Grid';

export default function DasboardAdminDeclined() {
  return (
    <ImplementGridDeclined>
      <Flex px={5} h={'100vh'} width={'100%'}>
        <AdminDeclined />
      </Flex>
    </ImplementGridDeclined>
  );
}
