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
import { useState } from 'react';
import AddIcon from '~/assets/icon-pack/button-icons/add-circle.svg';
import TrashIcon from '~/assets/icon-pack/button-icons/trash.svg';
import CloseCircle from "~/assets/icon-pack/button-icons/close-circle-s.svg"
// import GalleryAdd from '~/assets/icon-pack/button-icons/gallery-add.svg';
// import Dropzone from 'react-dropzone';

export function LazyProductVariant() {
  const [isLazy, setIsLazy] = useState(false)
  const [isColorActive, setIsColorActive] = useState(false)
  const [isSizeActive, setIsSizeActive] = useState(false)

  const toggle = () => {
    setIsLazy(!isLazy)
    setIsColorActive(false)
    setIsSizeActive(false)
  }

  //tags input shenanigans
  const [colorTags, setColorTags] = useState<string[]>([]);
  const [sizeTags, setSizeTags] = useState<string[]>([]);

  const [colorTagInput, setColorTagInput] = useState<string>('');
  const [sizeTagInput, setSizeTagInput] = useState<string>('')

  type VariantType = {
    name: string,
    active: boolean,
    price: number,
    stock: number,
    sku: string,
    weight: number
  }

  const [colorVariants, setColorVariants] = useState<VariantType[]>([])
  const [sizeVariants, setSizeVariants] = useState<VariantType[]>([])

  const colorVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const colorInputValue = e.target.value.replace(/,/g, '')
    setColorTagInput(colorInputValue);
  };

  const sizeVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sizeInputValue = e.target.value.replace(/,/g, '')
    setSizeTagInput(sizeInputValue);
  };

  const handleColorInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' && colorTagInput.trim() !== '') {
      const newVariant = {
        name: colorTagInput.trim(),
        active: true,
        price: 0,
        stock: 0,
        sku: '',
        weight: 0
      }
      setColorVariants([...colorVariants, newVariant])
      setColorTags([...colorTags, colorTagInput.trim()]);
      setColorTagInput('');
    }
  };

  const handleSizeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' && sizeTagInput.trim() !== '') {
      const newVariant = {
        name: sizeTagInput.trim(),
        active: true,
        price: 0,
        stock: 0,
        sku: '',
        weight: 0
      }
      setSizeVariants([...sizeVariants, newVariant])
      setSizeTags([...sizeTags, sizeTagInput.trim()]);
      setSizeTagInput('');
    }
  };

  const removeColorTag = (tagToRemove: string) => {
    const updatedTags = colorTags.filter(tag => tag !== tagToRemove)
    const updatedVariants = colorVariants.filter(variant => variant.name !== tagToRemove)
    setColorTags(updatedTags);
    setColorVariants(updatedVariants)
  };

  const removeSizeTag = (tagToRemove: string) => {
    const updatedTags = sizeTags.filter(tag => tag !== tagToRemove)
    const updatedVariants = sizeVariants.filter(variant => variant.name !== tagToRemove)
    setSizeTags(updatedTags);
    setSizeVariants(updatedVariants)
  };

  return (
    <Card>
      <CardBody>
        <Stack spacing={10}>
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
              leftIcon={<Image src={isLazy ? TrashIcon : AddIcon} />}
              fontSize={'sm'}
              onClick={toggle}
            >
              {isLazy ? 'Hapus Varian' : 'Tambah Varian'}
            </Button>
          </Flex>

          {isLazy &&
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
                <FormControl isRequired>
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
                          <TagLabel fontSize={'sm'} textColor={'black'}>{tag}</TagLabel>
                          <Image src={CloseCircle} onClick={() => removeColorTag(tag)}
                            cursor={'pointer'} />
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
                <FormControl isRequired>
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
                          <TagLabel fontSize={'sm'} textColor={'black'}>{tag}</TagLabel>
                          <Image src={CloseCircle} onClick={() => removeSizeTag(tag)}
                            cursor={'pointer'} />
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

              {colorVariants.map((colorVariant) => (
                sizeVariants.map((sizeVariant) => (
                  <Stack spacing={4} key={`${colorVariant.name}-${sizeVariant.name}`}>
                    <FormControl display="flex" alignItems="center">
                      <FormLabel fontWeight={'bold'} key=
                        {`${colorVariant.name}-${sizeVariant.name}`} mb="0">
                        {`${colorVariant.name} ${sizeVariant.name}`}
                      </FormLabel>
                      <Switch id={`${colorVariant.name}-${sizeVariant.name}`}
                        defaultChecked={true} />
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
                              name="price"
                            />
                          </InputGroup>
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Stock Produk</FormLabel>
                          <Input
                            type="number"
                            placeholder="Masukan jumlah stok"
                            name="stock"
                          />
                        </FormControl>
                      </Flex>
                      <Flex gap={4}>
                        <FormControl>
                          <FormLabel>SKU (Stock Keeping Unit)</FormLabel>
                          <Input type="text" placeholder="Masukan SKU" name="sku" />
                        </FormControl>
                        <FormControl isRequired>
                          <FormLabel>Berat Produk</FormLabel>
                          <InputGroup>
                            <Input
                              type="number"
                              placeholder="Masukan berat produk"
                              name="weight"
                            />
                            <InputRightAddon children="Gram" />
                          </InputGroup>
                        </FormControl>
                      </Flex>
                    </Stack>
                  </Stack>
                ))
              ))}
            </Stack>
          }
        </Stack>
      </CardBody>
    </Card>
  );
}
