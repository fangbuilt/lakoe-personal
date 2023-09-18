import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Flex,
} from '@chakra-ui/react';

import ScrollBox from '../components/ScrollBox';
import CardUnpaid from '../components/CardUnpaid';
import { useLoaderData } from '@remix-run/react';
import UnpaidAllCard from '~/components/CardUnpaidAll';
import type { loader } from '~/routes/order';

export default function NavOrder() {
  const { unpaidCard } = useLoaderData<typeof loader>();

  return (
    <>
      <Box
        background={'whitesmoke'}
        style={{ width: '100%', marginLeft: '-5px', marginRight: '50%' }}
      >
        <Box
          background={'white'}
          position={'fixed'}
          top={'50'}
          style={{
            marginTop: '1.3%',
            width: '47.5%',
            height: '100%',
            borderRadius: '10px',
          }}
        >
          <Tabs>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'20px'}>
                Daftar Pesanan
              </Text>
            </Box>

            <Box>
              <Box
                display={'flex'}
                overflow={'scroll'}
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <TabList mx={5}>
                  <Tab>Semua</Tab>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}

                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          {unpaidCard.length}
                          {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Belum </Text> <Text> Dibayar</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Pesanan</Text> <Text>Baru</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER  !*/}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Siap </Text> <Text>Dikirim</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Dalam </Text> <Text> Pengiriman</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        <Flex gap={1.5} my={4}>
                          <Text>Pesanan </Text> <Text> Selesai</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Tab>Dibatalkan</Tab>
                </TabList>
              </Box>
              {/* </Tabs> */}
            </Box>

            <Box my={5} paddingBottom={'100px'} background={'white'}>
              <TabPanels>
                {/* YOUR CARD START IN HERE ! */}
                {/* PASTE YOUR CARD IN HERE DON'T FORGET TO MAP IT*/}

                <ScrollBox>
                  <TabPanel>
                    <UnpaidAllCard />

                    {/*  
                      {filteredOrderByCourier.map((data, index) => (
               
                    <CardNewOrder/>
                    ))} 

                    {filteredOrderByCourier.map((data, index) => (
                      <CardReadyToShip />
                        
                    ))}
                    {filteredOrderByCourier.map((data, index) => (
                      <CardInShipping />
                    ))}
                    {filteredOrderByCourier.map((data, index) => (
                      <CardSuccessOrder  />
                    ))}
                    {filteredOrderByCourier.map((data, index) => (
                      <CardCanceled  />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardUnpaid
                    // filteredOrderByCourier={filteredOrderByCourier}
                    />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrderByCourier.map((data, index) => (
                      <CardNewOrder/>
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrderByCourier.map((data, index) => (
                      <CardReadyToShip/>
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrderByCourier.map((data, index) => (
                      <CardInShipping />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrderByCourier.map((data, index) => (
                      <CardSuccessOrder />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrderByCourier.map((data: any, index: any) => (
                      <CardCanceled  />
                    ))} */}
                  </TabPanel>
                </ScrollBox>
                {/* {filteredOrderByCourier.length === 0 && (
                  <Center>
                    <Box textAlign="center" mt={5} display={'flex'}>
                      <Image src={ReceiptSearch} />
                      <Text fontSize="16px" mt={1}>
                        Oops, pesanan yang kamu cari tidak ditemukan.
                        <Text
                          fontSize={'12px'}
                          color={'#909090'}
                          textAlign={'left'}
                        >
                          Coba bisa cari dengan kata kunci lain
                        </Text>
                      </Text>
                    </Box>
                  </Center>
                )} */}

                {/* END CARD */}
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
