import { Flex} from '@chakra-ui/react';
import NavOrder from '~/layouts/NavOrder';
import { ImplementGrid } from '~/layouts/Grid';

export default function Order() {
  return (
    <ImplementGrid>
      <Flex align={'center'} justify={'center'} h={'100vh'}>
        <NavOrder/>
      </Flex>
    </ImplementGrid>
  );
}
