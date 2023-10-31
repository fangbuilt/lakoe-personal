import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import useAddProduct from '../hooks/useAddProduct';
import { useLazy } from '../hooks/useVariantShenanigans';

export function ProductManagement() {
  const { handleChange } = useAddProduct();
  const { isLazy } = useLazy();
  return (
    <>
      {isLazy && (
        <Card>
          <CardBody>
            <Heading size={'md'}>Pengelolaan Produk</Heading>
            <Flex mt={7} gap={4} mb={3}>
              <FormControl isRequired>
                <FormLabel>Stock Produk</FormLabel>
                <Input
                  type="number"
                  placeholder="Masukan jumlah stok"
                  name={`variants[0][0][stock]`}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                <Input
                  type="text"
                  placeholder="Masukan SKU"
                  name={`variants[0][0][sku]`}
                  onChange={handleChange}
                />
              </FormControl>
            </Flex>
          </CardBody>
        </Card>
      )}
    </>
  );
}
