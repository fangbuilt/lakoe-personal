import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
} from '@chakra-ui/react';

export function WeightAndShipment() {
  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Berat & Pengiriman</Heading>
        <Stack mt={7} spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Berat Produk</FormLabel>
            <InputGroup>
              <Input
                type="number"
                placeholder="Masukan berat produk"
                name="product-weight"
              />
              <InputRightAddon children="Gram" />
            </InputGroup>
          </FormControl>

          <Flex justify={'space-between'} align={'end'} gap={4}>
            <FormControl>
              <FormLabel>Ukuran Produk</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Panjang"
                  name="product-length"
                />
                <InputRightAddon children="cm" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input type="number" placeholder="Lebar" name="product-width" />
                <InputRightAddon children="cm" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Tinggi"
                  name="product-height"
                />
                <InputRightAddon children="cm" />
              </InputGroup>
            </FormControl>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
