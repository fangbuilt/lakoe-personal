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
import useAddProduct from '../hooks/useAddProduct';

export function WeightAndShipment() {
  const { handleChange } = useAddProduct();
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
                name={`variants[0][0][weight]`}
                onChange={handleChange}
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
                  name="length"
                  onChange={handleChange}
                />
                <InputRightAddon children="cm" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Lebar"
                  name="width"
                  onChange={handleChange}
                />
                <InputRightAddon children="cm" />
              </InputGroup>
            </FormControl>

            <FormControl>
              <InputGroup>
                <Input
                  type="number"
                  placeholder="Tinggi"
                  name="height"
                  onChange={handleChange}
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
