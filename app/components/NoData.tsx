import { Box, Image, InputLeftElement, Text } from '@chakra-ui/react';
import SearchProduct from '../assets/icon-pack/search-product.svg';
export default function NoDataSearch() {
  return (
    <Box>
      <InputLeftElement pointerEvents="none">
        <Image src={SearchProduct} />
        <Text>No Data</Text>
      </InputLeftElement>
    </Box>
  );
}
