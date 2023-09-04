import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Link,
  Grid,
  GridItem,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  Image,
  FormHelperText,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react';

import GalleryAdd from '../assets/icon-pack/gallery-add.svg';

export default function Configuration() {
  return (
    <Grid templateColumns="repeat(4, 1fr)" gap={2} bg={'#f8f8f8'}>
      <GridItem colSpan={4} w="100%" h="10" bg={'white'} />
      <GridItem w="100%" h="100vh" bg={'white'} />
      <GridItem colSpan={2} borderRadius={'4'} bg={'white'}>
        <Tabs>
          <Text fontWeight={'semibold'} fontSize={'16px'} mb={2} ms={4}>
            Fesyen Store
          </Text>
          <TabList>
            <Link>
              <Tab fontWeight={'bolt'}>Informasi</Tab>
            </Link>
            <Link>
              <Tab>Lokasi</Tab>
            </Link>
            <Tab>Template Pesan</Tab>
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
                      placeholder="Buat Slogan Untuk Toko"
                      type="text"
                      py={-5}
                    />
                    <FormHelperText
                      display={'flex'}
                      justifyContent={'end'}
                      mt={0}
                      fontSize={'15px'}
                      color="blackAlpha.500"
                    >
                      0/48
                    </FormHelperText>
                  </GridItem>
                  <GridItem rowSpan={2}>
                    <FormLabel color={'blackAlpha.700'}>Deskripsi</FormLabel>

                    <Textarea
                      h={'150px'}
                      resize={'none'}
                      placeholder="Buat Nama Toko"
                    />

                    <FormHelperText
                      display={'flex'}
                      justifyContent={'end'}
                      mt={0}
                      fontSize={'15px'}
                      color="blackAlpha.500"
                    >
                      0/200
                    </FormHelperText>
                  </GridItem>
                  <GridItem colSpan={1}>
                    <FormLabel color={'blackAlpha.700'}>Nama Toko</FormLabel>
                    <Input placeholder="Buat Nama Toko" type="text" />
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
                py={'4px'}
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box w={'80%'}>
                  <Text fontWeight={'semibold'} fontSize={'16px'}>
                    Lokasi Toko
                  </Text>
                  <Text fontSize={'14px'} fontWeight={'thin'}>
                    Alamat ini akan digunakan sebagai alamat pengirimanmu
                  </Text>
                </Box>

                <Button
                  w={'20%'}
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
                <Table variant="simple" border={'none'}>
                  <Tbody>
                    <Tr>
                      <Td>inches</Td>
                      <Td>millimetres (mm)</Td>
                      <Td isNumeric>25.4</Td>
                    </Tr>
                    <Tr>
                      <Td>feet</Td>
                      <Td>centimetres (cm)</Td>
                      <Td isNumeric>30.48</Td>
                    </Tr>
                    <Tr>
                      <Td>yards</Td>
                      <Td>metres (m)</Td>
                      <Td isNumeric>0.91444</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
              {/* <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
                mt={"3px"}
                py={"12px"}
                px={"16px"}
                border={"1px"}
                borderColor={"#eee"}
                fontSize={"13px"}
                borderRadius={"10px"}
                gap={5}
              >
                <Box>
                  <Text mb={"3px"}>Nama Lokasi</Text>
                  <Text mb={"3px"}>Alamat</Text>
                  <Text mb={"3px"}>Kota/Kecamatan</Text>
                  <Text mb={"3px"}>Kode Pos</Text>
                  <Text mb={"3px"}>Pinpoint</Text>
                </Box>
                <Box>
                  <Text mb={"3px"}>
                    Fesyen Store 2
                    <span
                      style={{
                        marginLeft: "10px",
                        backgroundColor: "Green",
                        padding: "2px 10px",
                        color: "white",
                        borderRadius: "5px",
                      }}
                    >
                      Alamat Utama
                    </span>
                  </Text>
                  <Text mb={"3px"}>
                    Jl.Elang, No. 4, Sawah lama, Ciputat, Tangerang Selatan
                  </Text>
                  <Text mb={"3px"}>Kota Tangerang Selatan, Kec. Ciputat</Text>
                  <Text mb={"3px"}>15413</Text>
                  <Text mb={"3px"}>Sudah Pinpoint</Text>
                </Box>
                <Box>
                  <Text mb={"3px"}>Nama Lokasi</Text>
                  <Text mb={"3px"}>Alamat</Text>
                  <Text mb={"3px"}>Kota/Kecamatan</Text>
                  <Text mb={"3px"}>Kode Pos</Text>
                  <Text mb={"3px"}>Pinpoint</Text>
                </Box>
              </Box> */}
            </TabPanel>
            <TabPanel>
              <p>Template Pesan</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </GridItem>
      <GridItem w="100%" h="100vh" bg="white" />
    </Grid>
  );
}
