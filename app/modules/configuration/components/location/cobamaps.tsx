import { Box } from '@chakra-ui/react';
import Maps from '~/modules/configuration/components/location/Maps';

export default function maps() {
  return (
    <Box bg="white" h={'100vh'} p={10}>
      <Maps />
    </Box>
  );
}
