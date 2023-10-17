import {
  Box,
  Flex,
  Image,
  TabPanel,
  Table,
  TableContainer,
  Td,
  Text,
  Tr,
} from '@chakra-ui/react';
import { useLoaderData } from '@remix-run/react';
import Location from '~/assets/icon-pack/location.svg';
import type { loader } from '~/routes/configuration_.storeConfiguration';
import {
  CreateButtonLocation,
  DeleteButtonLocation,
  UpdateButtonLocation,
} from './Modals';

export default function Locations() {
  const newData = useLoaderData<typeof loader>();
  return (
    <>
      <TabPanel bg={'white'}>
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
          <CreateButtonLocation />
        </Box>
        <Box>
          {newData.getLocationData.map((data) => (
            <TableContainer
              key={data.id}
              border={'1px'}
              borderColor={'#eee'}
              borderRadius={'15px'}
              p={'10px'}
              mt={'10px'}
            >
              <Flex gap={5} justifyContent={'space-between'}>
                <Box>
                  {data.isMainLocation}
                  <Table variant="none" fontSize={'12px'}>
                    <Tr>
                      <Td p={'0px'}>Nama Lokasi</Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Alamat</Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Kota/Kecamatan</Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Kode Pos</Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>Pinpoint</Td>
                    </Tr>
                  </Table>
                </Box>
                <Box display={'flex'} w={'100%'} ps={'20px'}>
                  <Table variant="none" fontSize={'12px'}>
                    <Tr>
                      <Td p={'0px'} fontWeight={'bold'}>
                        {data.name}
                        {/* <span
                          style={{
                            marginLeft: "10px",
                            backgroundColor: "Green",
                            padding: "2px 10px",
                            color: "white",
                            borderRadius: "5px",
                          }}
                        >
                          Alamat Utama
                        </span> */}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>{data.address}</Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>{data.cityDistrict}</Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}>{data.postalCode}</Td>
                    </Tr>
                    <Tr>
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
                    </Tr>
                  </Table>
                </Box>
                <Box>
                  <Table
                    display={'flex'}
                    justifyContent={'space-between'}
                    flexDirection={'column'}
                    alignItems={'flex-end'}
                    variant="none"
                    fontSize={'12px'}
                  >
                    <Tr>
                      <Td p={'0px'}>
                        <Flex>
                          <DeleteButtonLocation
                            id={data.id}
                            name={data.name}
                            address={''}
                            addressNote={''}
                            latitude={''}
                            longtitude={''}
                            postalCode={''}
                            cityDistrict={''}
                            isMainLocation={false}
                          />
                          <UpdateButtonLocation
                            id={data.id}
                            name={data.name}
                            address={data.address}
                            addressNote={''}
                            latitude={data.latitude}
                            longtitude={data.longtitude}
                            postalCode={''}
                            cityDistrict={data.cityDistrict}
                            isMainLocation={false}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr>
                      <Td p={'0px'}></Td>
                    </Tr>
                    <Tr pt={'40px'}>
                      <Td p={'0px'}>
                        {/* <UpdateButtonMain
                          id={data.id}
                          name={data.name}
                          address={data.address}
                          addressNote={""}
                          latitude={data.latitude}
                          longtitude={data.longtitude}
                          postalCode={""}
                          cityDistrict={data.cityDistrict}
                          isMainLocation={false}
                        /> */}
                      </Td>
                    </Tr>
                  </Table>
                </Box>
              </Flex>
            </TableContainer>
          ))}
        </Box>
      </TabPanel>
    </>
  );
}
