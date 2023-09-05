import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
} from '@chakra-ui/react';

export function Price() {
  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Harga</Heading>
        <Stack mt={7} spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Harga</FormLabel>
            <InputGroup>
              <InputLeftAddon children="Rp" />
              <Input
                type="text"
                placeholder="Masukan harga satuan barang"
                name="product-price"
              />
            </InputGroup>
          </FormControl>

          <FormControl>
            <FormLabel>Minimal Pembelian</FormLabel>
            <InputGroup>
              <Input type="number" placeholder="1" name="product-min-order" />
              <InputRightAddon children="Produk" />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
}
