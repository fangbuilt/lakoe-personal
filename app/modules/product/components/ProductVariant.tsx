import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import AddIcon from '../../../assets/icon-pack/button-icons/add-circle.svg';

export function ProductVariant() {
  return (
    <Card>
      <CardBody>
        <Flex justify={'space-between'} align={'center'}>
          <Stack>
            <Heading size={'md'}>Varian Produk</Heading>
            <Text fontSize={'sm'}>
              Tambah varian agar pembeli dapat memilih produk yang sesuai, yuk!
            </Text>
          </Stack>
          <Button
            variant={'outline'}
            borderRadius={'full'}
            leftIcon={<Image src={AddIcon} />}
            fontSize={'sm'}
          >
            Tambah Varian
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}
