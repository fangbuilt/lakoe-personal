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
import useAddProduct from '../hooks/useAddProduct';
import { useLazy } from '../hooks/useVariantShenanigans';

export function Price() {
  const { handleChange } = useAddProduct();
  const { isLazy } = useLazy();
  return (
    <Card>
      <CardBody>
        {isLazy ? (
          <Heading size={'md'}>Harga</Heading>
        ) : (
          <Heading size={'md'}>Atur Minimal Pembelian</Heading>
        )}
        <Stack mt={7} spacing={4} mb={3}>
          {isLazy && (
            <FormControl isRequired>
              <FormLabel>Harga</FormLabel>
              <InputGroup>
                <InputLeftAddon children="Rp" />
                <Input
                  type="text"
                  placeholder="Masukan harga satuan barang"
                  name={`variants[0][0][price]`}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormControl>
          )}

          <FormControl>
            <FormLabel>Minimal Pembelian</FormLabel>
            <InputGroup>
              <Input
                type="number"
                placeholder="1"
                name="min_order"
                onChange={handleChange}
              />
              <InputRightAddon children="Produk" />
            </InputGroup>
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
}
