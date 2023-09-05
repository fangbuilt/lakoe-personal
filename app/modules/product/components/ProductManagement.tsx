import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';

export function ProductManagement() {
  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Pengelolaan Produk</Heading>
        <Flex mt={7} gap={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Stock Produk</FormLabel>
            <Input
              type="number"
              placeholder="Masukan jumlah stok"
              name="product-stock"
            />
          </FormControl>

          <FormControl>
            <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
            <Input type="text" placeholder="Masukan SKU" name="product-sku" />
          </FormControl>
        </Flex>
      </CardBody>
    </Card>
  );
}
