import {
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  Stack,
} from '@chakra-ui/react';

export function ProductInformation() {
  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Informasi Produk</Heading>
        <Stack mt={7} spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Nama Produk</FormLabel>
            <Input
              type="text"
              name="product-name"
              placeholder="Masukan nama produk"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>URL Halman Checkout</FormLabel>
            <InputGroup>
              <InputLeftAddon children="lakoe.store/" />
              <Input type="text" name="product-url" placeholder="nama-produk" />
            </InputGroup>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Kategori</FormLabel>
            <Select
              defaultValue={'Pilih kategori produk'}
              name="product-category"
            >
              <option disabled>Pilih kategori produk</option>
              <option value={'Option A'}>Option A</option>
              <option value={'Option B'}>Option B</option>
              <option value={'Option C'}>Option C</option>
            </Select>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
}
