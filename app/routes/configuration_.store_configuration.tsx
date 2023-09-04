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
} from '@chakra-ui/react';
import { ImplementGrid } from '~/layouts/Grid';
import GalleryAdd from '../assets/icon-pack/gallery-add.svg';
import Location from '../assets/icon-pack/location.svg';
import Edit from '../assets/icon-pack/edit.svg';
import Trash from '../assets/icon-pack/trash.svg';

export default function StoreConfiguration() {
  return (
    <ImplementGrid>
      <Flex h={'100vh'} mt={5}>
        <Tabs bg={'white'} mt={5} w={'100%'} borderRadius={5}>
          <Text fontWeight={'semibold'} fontSize={'16px'} my={4} ms={4}>
            Fesyen Store
          </Text>
          <TabList>
            <Tab textDecoration={'none'}>Informasi</Tab>

            <Tab textDecoration={'none'}>Lokasi</Tab>

            <Tab textDecoration={'none'}>Template Pesan</Tab>
          </TabList>

          <TabPanels>
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
              <Text fontSize={'13px'} w={'70%'} h={'1000px'}>
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
                  borderColor={'grey'}
                  border={'1px'}
                  bg={'white'}
                  fontSize={'12px'}
                >
                  Tambah Lokasi
                </Button>
              </Box>
              <TableContainer>
                <Table variant="none" fontSize={'12px'} mt={'20px'}>
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
                        <Box>
                          <Button
                            borderRadius={'full'}
                            borderColor={'grey'}
                            bg={'transparent'}
                            border={'1px'}
                          >
                            <Image src={Trash} />
                          </Button>
                          <Button
                            borderRadius={'full'}
                            borderColor={'grey'}
                            bg={'transparent'}
                            border={'1px'}
                          >
                            <Image src={Edit} />
                          </Button>
                        </Box>
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
            </TabPanel>

            <TabPanel>
              <p>Template Pesan</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </ImplementGrid>
  );
}
