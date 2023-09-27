import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Textarea,
  Tr,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Select,
  Stack,
  Card,
} from '@chakra-ui/react';
import { ImplementGrid } from '~/layouts/Grid';
import GalleryAdd from '../assets/icon-pack/gallery-add.svg';
import Location from '../assets/icon-pack/location.svg';
import Edit from '../assets/icon-pack/edit.svg';
import Trash from '../assets/icon-pack/trash.svg';
import LocationSlash from '../assets/icon-pack/location-slash.svg';
import CloseCircle from '../assets/icon-pack/close-circle.svg';
import React from 'react';
import {
  DeleteButton,
  UpdateButton,
  CreateButton,
} from '~/modules/configuration/components/CrudModal';
import type { ActionArgs } from '@remix-run/node';
import {
  getMessages,
  updateMessage,
  deleteMessage,
  createMessage,
  getStoreId,
} from '~/modules/configuration/configuration.service';
import { useLoaderData } from '@remix-run/react';
import Scroll from '~/modules/configuration/components/Scroll';
import { updateMessageSchema } from '~/modules/configuration/configuration.schema';

export async function loader({ params }: ActionArgs) {
  const messages = await getMessages();
  const { storeId } = params;
  const store_id = await getStoreId(storeId);

  return { messages, store_id };
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get('action');

  if (action === 'create') {
    const name = formData.get('name') as string;
    const storeId = formData.get('storeId') as string;
    const content = formData.get('content') as string;

    await createMessage(name, storeId, content);
  } else if (action === 'delete') {
    const id = formData.get('id') as string;
    await deleteMessage(id);
  } else if (action === 'update') {
    const id = formData.get('id') as string;
    const name = formData.get('updatedName') as string;
    const content = formData.get('updatedContent') as string;

    const validatedData = updateMessageSchema.parse({ id, name, content });

    await updateMessage(validatedData);
  }

  return null;
}

export default function StoreConfiguration() {
  const data = useLoaderData<typeof loader>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <ImplementGrid>
      <Flex h={'105vh'} mt={5}>
        <Tabs bg={'white'} mt={5} w={'100%'} borderRadius={5}>
          <Text fontWeight={'bold'} fontSize={'16px'} my={4} ms={4}>
            Fesyen Store
          </Text>
          <TabList>
            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Informasi
            </Tab>

            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Lokasi
            </Tab>

            <Tab
              fontWeight={'semibold'}
              fontSize={'sm'}
              textDecoration={'none'}
            >
              Template Pesan
            </Tab>
          </TabList>

          <TabPanels>
            {/* INI BAGIAN rifki */}
            <TabPanel>
              <Text fontWeight={'semibold'} fontSize={'16px'} mb={3}>
                Informasi Toko
              </Text>

              <FormControl>
                <Grid
                  h="150px"
                  templateRows="repeat(2, 1fr)"
                  templateColumns="repeat(2, 1fr)"
                  gap={4}
                >
                  <GridItem colSpan={1}>
                    <FormLabel color={'blackAlpha.700'}>Slogan</FormLabel>
                    <Input
                      fontSize={'15px'}
                      placeholder="Buat Slogan Untuk Toko"
                      type="text"
                      py={-5}
                    />
                    <FormHelperText
                      display={'flex'}
                      justifyContent={'end'}
                      mt={1}
                      fontSize={'13px'}
                      color="blackAlpha.500"
                    >
                      0/48
                    </FormHelperText>
                  </GridItem>
                  <GridItem rowSpan={2}>
                    <FormLabel color={'blackAlpha.700'}>Deskripsi</FormLabel>

                    <Textarea
                      fontSize={'15px'}
                      h={'150px'}
                      resize={'none'}
                      placeholder="Tuliskan deskripsi toko disini"
                    />

                    <FormHelperText
                      display={'flex'}
                      justifyContent={'end'}
                      mt={1}
                      fontSize={'13px'}
                      color="blackAlpha.500"
                    >
                      0/200
                    </FormHelperText>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel color={'blackAlpha.700'}>Nama Toko</FormLabel>
                    <Input
                      fontSize={'15px'}
                      placeholder="Buat Nama Toko"
                      type="text"
                    />
                  </GridItem>
                </Grid>
              </FormControl>
              <Flex alignItems={'end'} justifyContent={'end'}>
                <Button
                  size={'sm'}
                  px={5}
                  mt={'70px'}
                  mb={'3'}
                  color={'white'}
                  borderRadius={'full'}
                  bg={'#0086B4'}
                >
                  Simpan
                </Button>
              </Flex>
              <hr />
              <Text fontWeight={'semibold'} fontSize={'16px'} mt={3}>
                Logo Toko
              </Text>
              <FormLabel w={'100px'} my={3}>
                <Box
                  border={'dashed'}
                  borderWidth={'2px'}
                  display={'flex'}
                  justifyContent={'center'}
                  flexDirection={'column'}
                  alignItems={'center'}
                  borderRadius={'10px'}
                  borderColor={'blackAlpha.300'}
                  w={'100px'}
                  h={'100px'}
                >
                  <Image
                    justifyContent={'center'}
                    w={'30px'}
                    h={'30px'}
                    src={GalleryAdd}
                  />
                  <Text fontSize={'11px'} color={'blackAlpha.700'}>
                    Unggah Photo
                  </Text>
                  <Input hidden type="file"></Input>
                </Box>
              </FormLabel>
              <Text fontSize={'13px'} w={'70%'}>
                Ukuran optimal 300 x 300 piksel dengan Besar file: Maksimum 10
                Megabytes. Ekstensi file yang diperbolehkan: JPG, JPEG, PNG
              </Text>
            </TabPanel>

            {/* INI BAGIAN BAGZA */}
            <TabPanel>
              <Box
                w={'100%'}
                py={'4px'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box>
                  <Text fontWeight={'semibold'} fontSize={'16px'}>
                    Lokasi Toko
                  </Text>
                  <Text fontSize={'14px'} fontWeight={'thin'}>
                    Alamat ini akan digunakan sebagai alamat pengirimanmu
                  </Text>
                </Box>

                <Button
                  borderRadius={'20px'}
                  border={'1px solid #aeaeae'}
                  bg={'white'}
                  fontSize={'12px'}
                  size={'sm'}
                  onClick={onOpen}
                >
                  Tambah Lokasi
                </Button>
              </Box>
              <TableContainer
                border={'1px'}
                borderColor={'#eee'}
                borderRadius={'15px'}
                p={'10px'}
                mt={'10px'}
              >
                <Table variant="none" fontSize={'12px'}>
                  <Tbody>
                    <Tr>
                      <Td p={'0px'}>Nama Lokasi</Td>
                      <Td p={'0px'}>
                        Fesyen Store 2
                        <span
                          style={{
                            marginLeft: '10px',
                            backgroundColor: 'Green',
                            padding: '2px 10px',
                            color: 'white',
                            borderRadius: '5px',
                          }}
                        >
                          Alamat Utama
                        </span>
                      </Td>
                      <Td p={'0px'}>
                        <Button
                          borderRadius={'full'}
                          bg={'white'}
                          border={'1px solid #aeaeae'}
                          p={'0px'}
                          me={'7px'}
                          size={'sm'}
                        >
                          <Image w={'15px'} src={Trash} />
                        </Button>
                        <Button
                          borderRadius={'full'}
                          bg={'white'}
                          border={'1px solid #aeaeae'}
                          p={'0px'}
                          size={'sm'}
                        >
                          <Image w={'15px'} src={Edit} />
                        </Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Alamat</Td>
                      <Td p={'0px'}>
                        Jl.Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan
                      </Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Kota/Kecamatan</Td>
                      <Td p={'0px'}>Kota Tangerang Selatan, Kec. Ciputat</Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Kode Pos</Td>
                      <Td p={'0px'}>15413</Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Pinpoint</Td>
                      <Td p={'0px'}>
                        <Box
                          color={'#0086B4'}
                          display={'flex'}
                          flexDirection={'row'}
                        >
                          <Image src={Location} />
                          <Text>Sudah Endpoint</Text>
                        </Box>
                      </Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <TableContainer
                border={'1px'}
                borderColor={'#eee'}
                borderRadius={'15px'}
                p={'10px'}
                mt={'10px'}
              >
                <Table variant="none" fontSize={'12px'}>
                  <Tbody>
                    <Tr>
                      <Td p={'0px'}>Nama Lokasi</Td>
                      <Td p={'0px'}>Fesyen Store 2</Td>
                      <Td p={'0px'}>
                        <Button
                          borderRadius={'full'}
                          bg={'white'}
                          border={'1px solid #aeaeae'}
                          p={'0px'}
                          me={'7px'}
                          size={'sm'}
                        >
                          <Image w={'15px'} src={Trash} />
                        </Button>
                        <Button
                          borderRadius={'full'}
                          bg={'white'}
                          border={'1px solid #aeaeae'}
                          p={'0px'}
                          size={'sm'}
                        >
                          <Image w={'15px'} src={Edit} />
                        </Button>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Alamat</Td>
                      <Td p={'0px'}>
                        Jl.Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan
                      </Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Kota/Kecamatan</Td>
                      <Td p={'0px'}>Kota Tangerang Selatan, Kec. Ciputat</Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Kode Pos</Td>
                      <Td p={'0px'}>15413</Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Pinpoint</Td>
                      <Td p={'0px'}>
                        <Box
                          color={'#aeaeae'}
                          display={'flex'}
                          flexDirection={'row'}
                        >
                          <Image src={LocationSlash} />
                          <Text>Belum Endpoint</Text>
                        </Box>
                      </Td>
                      <Td p={'0px'}></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    display={'flex'}
                    flexDirection={'row'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Text>Tambah Lokasi Baru</Text>
                    <Button
                      onClick={onClose}
                      p={'0px'}
                      colorScheme="none"
                      display={'flex'}
                      flexDirection={'row'}
                      justifyContent={'end'}
                      alignItems={'center'}
                    >
                      <Image w={'30px'} src={CloseCircle} />
                    </Button>
                  </ModalHeader>
                  {/* <ModalCloseButton /> */}
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Nama Lokasi</FormLabel>
                      <Input
                        ref={initialRef}
                        placeholder="Cth. Toko Alamanda"
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Kota/Kecamatan</FormLabel>
                      <Select>
                        <option value="" hidden>
                          Cari kota / Kecamatan
                        </option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Kode Pos</FormLabel>
                      <Select>
                        <option value="" hidden color="red">
                          Masukan 5 digit kode pos
                        </option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Alamat Lengkap</FormLabel>
                      <Textarea placeholder="Tuliskan Alamat lengkap Toko" />
                    </FormControl>
                  </ModalBody>

                  <ModalFooter>
                    <Button mr={2} onClick={onClose} borderRadius={'20px'}>
                      Batalkan
                    </Button>
                    <Button colorScheme="blue" borderRadius={'20px'}>
                      Simpan
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </TabPanel>

            {/* INI BAGIAN MIKHAEL DAN HELEN */}
            <TabPanel>
              <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                mb={'16px'}
              >
                <Text fontWeight={'bold'} fontSize={'16px'}>
                  Daftar Template Pesan
                </Text>
                <CreateButton storeId={data.store_id?.id} />
              </Flex>
              <Scroll>
                <Stack spacing="2">
                  {data.messages.map((data, id) => (
                    <Card
                      key={id}
                      borderRadius={'lg'}
                      p={3}
                      pb={2}
                      variant={'outline'}
                    >
                      <Flex
                        justifyContent={'space-between'}
                        alignItems={'center'}
                        mb={2}
                      >
                        <Text fontWeight={'bold'} fontSize={'14px'}>
                          {data.name}
                        </Text>
                        <Flex gap={3}>
                          <UpdateButton
                            id={data.id}
                            name={data.name}
                            content={data.content}
                          />
                          <DeleteButton
                            id={data.id}
                            name={data.name}
                            content={data.content}
                          />
                        </Flex>
                      </Flex>
                      <Text fontSize={'13px'}>
                        {data.content && (
                          <div
                            dangerouslySetInnerHTML={{ __html: data.content }}
                          />
                        )}
                      </Text>
                    </Card>
                  ))}
                </Stack>
              </Scroll>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
