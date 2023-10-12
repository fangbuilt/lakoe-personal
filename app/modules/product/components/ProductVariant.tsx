import {
  Box,
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
  Tag,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import AddIcon from '~/assets/icon-pack/button-icons/add-circle.svg';
import TrashIcon from '~/assets/icon-pack/button-icons/trash.svg';
import CloseCircle from '~/assets/icon-pack/button-icons/close-circle-s.svg';
import { useVariant } from '../hooks/useVariantShenanigans';
// import GalleryAdd from '~/assets/icon-pack/button-icons/gallery-add.svg';
// import Dropzone from 'react-dropzone';

export function LazyProductVariant() {
  const {
    isColorActive,
    isSizeActive,
    toggle,
    colorVariantChange,
    sizeVariantChange,
    handleColorInputKeyDown,
    handleSizeInputKeyDown,
    removeColorTag,
    removeSizeTag,
    isLazy,
    colorVariants,
    sizeVariants,
    setIsColorActive,
    setIsSizeActive,
    colorTags,
    sizeTags,
    colorTagInput,
    sizeTagInput,
  } = useVariant();

  console.log('ini length color', colorVariants.length);
  console.log('ini length size', sizeVariants.length);

  return (
    <Card>
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
              leftIcon={<Image src={isLazy ? TrashIcon : AddIcon} />}
              fontSize={'sm'}
              onClick={toggle}
            >
              {isLazy ? 'Hapus Varian' : 'Tambah Varian'}
            </Button>
          </Flex>

          {isLazy && (
            <Stack spacing={10}>
              <HStack>
                <Button
                  variant={'outline'}
                  borderRadius={'full'}
                  bgColor={isColorActive ? 'lakoeCyanMuted' : 'unset'}
                  borderColor={isColorActive ? 'lakoeCyan' : 'gray.200'}
                  onClick={() => setIsColorActive(!isColorActive)}
                >
                  Warna
                </Button>
                <Button
                  variant={'outline'}
                  borderRadius={'full'}
                  bgColor={isSizeActive ? 'lakoeCyanMuted' : 'unset'}
                  borderColor={isSizeActive ? 'lakoeCyan' : 'gray.200'}
                  onClick={() => setIsSizeActive(!isSizeActive)}
                >
                  Ukuran
                </Button>
                <Button
                  variant={'outline'}
                  borderRadius={'full'}
                  leftIcon={<Image src={AddIcon} />}
                >
                  Buat Tipe Varian
                </Button>
              </HStack>

              {isColorActive && (
                <FormControl>
                  <FormLabel>Warna</FormLabel>
                  <Box
                    border={'1px'}
                    borderColor={'gray.200'}
                    bgColor={'white'}
                    borderRadius={'md'}
                    py={2}
                    px={3}
                  >
                    <Flex alignItems={'center'} flexWrap={'wrap'} gap={2}>
                      {colorTags.map((tag, index) => (
                        <Tag
                          key={index}
                          variant="solid"
                          bgColor={'#e6e6e6'}
                          gap={1}
                          w={'fit-content'}
                        >
                          <TagLabel fontSize={'sm'} textColor={'black'}>
                            {tag}
                          </TagLabel>
                          <Image
                            src={CloseCircle}
                            onClick={() => removeColorTag(tag)}
                            cursor={'pointer'}
                          />
                        </Tag>
                      ))}
                      <Input
                        value={colorTagInput}
                        onChange={colorVariantChange}
                        onKeyDown={handleColorInputKeyDown}
                        variant={'unstyled'}
                        w={'fit-content'}
                      />
                    </Flex>
                  </Box>
                </FormControl>
              )}

              {isSizeActive && (
                <FormControl>
                  <FormLabel>Ukuran</FormLabel>
                  <Box
                    border={'1px'}
                    borderColor={'gray.200'}
                    bgColor={'white'}
                    borderRadius={'md'}
                    py={2}
                    px={3}
                  >
                    <Flex alignItems={'center'} flexWrap={'wrap'} gap={2}>
                      {sizeTags.map((tag, index) => (
                        <Tag
                          key={index}
                          variant="solid"
                          bgColor={'#e6e6e6'}
                          gap={1}
                          w={'fit-content'}
                        >
                          <TagLabel fontSize={'sm'} textColor={'black'}>
                            {tag}
                          </TagLabel>
                          <Image
                            src={CloseCircle}
                            onClick={() => removeSizeTag(tag)}
                            cursor={'pointer'}
                          />
                        </Tag>
                      ))}
                      <Input
                        value={sizeTagInput}
                        onChange={sizeVariantChange}
                        onKeyDown={handleSizeInputKeyDown}
                        variant={'unstyled'}
                        w={'fit-content'}
                      />
                    </Flex>
                  </Box>
                </FormControl>
              )}

              {/* "Atur sekaligus" modal trigger */}
              {(colorTags || sizeTags).length > 0 && (
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
                    _hover={{ textColor: 'black', bgColor: 'gray.200' }}
                  >
                    Atur Sekaligus
                  </Button>
                </Flex>
              )}

              {colorVariants.map((colorVariant, colorIndex) =>
                sizeVariants.map((sizeVariant, sizeIndex) => (
                  <Stack
                    spacing={4}
                    key={`${colorVariant.name}-${sizeVariant.name}`}
                  >
                    <FormControl display="flex" alignItems="center">
                      <FormLabel
                        fontWeight={'bold'}
                        key={`${colorVariant.name}-${sizeVariant.name}`}
                        mb="0"
                      >
                        {`${colorVariant.name} ${sizeVariant.name}`}
                      </FormLabel>
                      <Switch
                        id={`${colorVariant.name}-${sizeVariant.name}`}
                        defaultChecked={true}
                      />
                      <Text ms={2}>Aktif</Text>
                    </FormControl>
                    <Stack spacing={10}>
                      <Flex gap={4}>
                        <FormControl>
                          <input
                            type="text"
                            hidden
                            name={`variants[${colorIndex}][${sizeIndex}][name]`}
                            value={`${colorVariant.name} ${sizeVariant.name}`}
                          />
                          <input
                            type="number"
                            name="colorVariants"
                            value={colorVariants.length}
                            hidden
                            readOnly
                          />
                          <input
                            type="number"
                            name="sizeVariants"
                            value={sizeVariants.length}
                            hidden
                            readOnly
                          />
                          <FormLabel>Harga</FormLabel>
                          <InputGroup>
                            <InputLeftAddon children="Rp" />
                            <Input
                              type="text"
                              placeholder="Masukan harga satuan barang"
                              name={`variants[${colorIndex}][${sizeIndex}][price]`}
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Stock Produk</FormLabel>
                          <Input
                            type="number"
                            placeholder="Masukan jumlah stok"
                            name={`variants[${colorIndex}][${sizeIndex}][stock]`}
                          />
                        </FormControl>
                      </Flex>
                      <Flex gap={4}>
                        <FormControl>
                          <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                          <Input
                            type="text"
                            placeholder="Masukan SKU"
                            name={`variants[${colorIndex}][${sizeIndex}][sku]`}
                          />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Berat Produk</FormLabel>
                          <InputGroup>
                            <Input
                              type="number"
                              placeholder="Masukan berat produk"
                              name={`variants[${colorIndex}][${sizeIndex}][weight]`}
                            />
                            <InputRightAddon children="Gram" />
                          </InputGroup>
                        </FormControl>
                      </Flex>
                    </Stack>
                  </Stack>
                ))
              )}
            </Stack>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
}
