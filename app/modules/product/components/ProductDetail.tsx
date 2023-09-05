import {
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react';

export function ProductDetail() {
  return (
    <Card>
      <CardBody>
        <Heading size={'md'}>Detail Produk</Heading>
        <Stack mt={7} spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Deskripsi</FormLabel>
            <Textarea
              maxH={400}
              minH={200}
              placeholder="Masukan deskripsi lengkap produk kamu"
              name="product-description"
            />
            <FormHelperText textAlign={'right'}>0/3000</FormHelperText>
            {/* how to make the form helper text dynamic as we type? */}
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Foto Produk</FormLabel>
            <Input type="file" name="product-image" />
            {/* how to make the drop zones and the corresponding styles? */}
          </FormControl>
        </Stack>
      </CardBody>
    </Card>
  );
}
