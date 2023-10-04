import {
  // Box,
  Button,
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  Switch,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import AddIcon from '~/assets/icon-pack/button-icons/add-circle.svg';
import TrashIcon from '~/assets/icon-pack/button-icons/trash.svg';
// import GalleryAdd from '~/assets/icon-pack/button-icons/gallery-add.svg';
// import Dropzone from 'react-dropzone';

export function LazyProductVariant() {
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

export function ProductVariant() {
  const [isActive, setIsActive] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setIsActive(index === isActive ? null : index);
  };
  const labels = [{ label: 'Warna' }, { label: 'Ukuran' }];

  const variants = [{ name: 'Hitam' }, { name: 'Merah' }];

  return (
    <Card pb={3}>
      <CardBody>
        <Stack spacing={10}>
          <Flex justify={'space-between'} align={'center'}>
            <Stack>
              <Heading size={'md'}>Varian Produk</Heading>
              <Text fontSize={'sm'}>
                Tambah varian agar pembeli dapat memilih produk yang sesuai,
                yuk!
              </Text>
            </Stack>
            <Button
              variant={'outline'}
              borderRadius={'full'}
              leftIcon={<Image src={TrashIcon} />}
              fontSize={'sm'}
            >
              Hapus Varian
            </Button>
          </Flex>
          <HStack>
            {labels.map((label, index) => (
              <Button
                key={index}
                className={`${isActive === index ? 'active' : 'inactive'}`}
                variant={'outline'}
                borderRadius={'full'}
                bgColor={isActive === index ? 'lakoeCyanMuted' : 'unset'}
                borderColor={isActive === index ? 'lakoeCyan' : 'gray.200'}
                onClick={() => handleClick(index)}
              >
                {label.label}
              </Button>
            ))}
            <Button
              variant={'outline'}
              borderRadius={'full'}
              leftIcon={<Image src={AddIcon} />}
            >
              Buat Tipe Varian
            </Button>
          </HStack>

          <FormControl isRequired>
            <FormLabel>Warna</FormLabel>
            <Input type="text" name="variant-label"></Input>
          </FormControl>

          <FormControl display="flex" alignItems="center" gap={2}>
            <Switch size={'lg'} id="use-variant-photo" />
            <FormLabel htmlFor="use-variant-photo" mb="0">
              Gunakan foto varian
            </FormLabel>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Foto Produk</FormLabel>
          </FormControl>

          <Flex justify={'space-between'} align={'center'}>
            <Stack>
              <Heading size={'md'}>Daftar Varian</Heading>
              <Text fontSize={'sm'}>
                Kamu dapat megatur harga, stok, dan SKU sekaligus
              </Text>
            </Stack>
            <Button
              borderRadius={'full'}
              fontSize={'sm'}
              bgColor={'lakoeCyan'}
              textColor={'white'}
            >
              Atur Sekaligus
            </Button>
          </Flex>

          {variants.map((variant, index) => (
            <Stack spacing={4} key={index}>
              <FormControl display="flex" alignItems="center">
                <FormLabel fontWeight={'bold'} htmlFor={variant.name} mb="0">
                  {variant.name}
                </FormLabel>
                <Switch id={variant.name} />
                <Text ms={2}>Aktif</Text>
              </FormControl>

              <Stack spacing={10}>
                <Flex gap={4}>
                  <FormControl isRequired>
                    <FormLabel>Harga</FormLabel>
                    <InputGroup>
                      <InputLeftAddon children="Rp" />
                      <Input
                        type="text"
                        placeholder="Masukan harga satuan barang"
                        name="price-variant"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Stock Produk</FormLabel>
                    <Input
                      type="number"
                      placeholder="Masukan jumlah stok"
                      name="stock-variant"
                    />
                  </FormControl>
                </Flex>

                <Flex gap={4}>
                  <FormControl>
                    <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                    <Input type="text" placeholder="Masukan SKU" name="sku-variant" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Berat Produk</FormLabel>
                    <InputGroup>
                      <Input
                        type="number"
                        placeholder="Masukan berat produk"
                        name="weight-variant"
                      />
                      <InputRightAddon children="Gram" />
                    </InputGroup>
                  </FormControl>
                </Flex>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
}
