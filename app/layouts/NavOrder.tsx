/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { loader } from '~/routes/order';
import ScrollBox from '../components/ScrollBox';
import CardReadyToShip from '~/components/CardReadyToShip';
import UnpaidAllCard from '~/components/CardUnpaidAll';
import UnpaidCard from '~/components/CardUnpaid';
import CardInShipping from '~/components/CardInShipping';
import CardNewOrderBa from '~/components/CardNewOrderBa';
import CardSuccess from '~/components/CardSuccess';
import CardCenceled from '~/components/CardCanceled';

export default function NavOrder({ allOrderSevice }: any) {
  const cardProduct = useLoaderData<typeof loader>();
  const { unpaidCard } = useLoaderData<typeof loader>();
  const notificationCount =
    cardProduct.dataProductReadyToShip.length > 0
      ? cardProduct.dataProductReadyToShip.length
      : 0;
  const [activeTab, setActiveTab] = useState(0);
  const handleClickTab = (index: number) => {
    setActiveTab(index);
  };
  // const {unpaidCard} = useLoaderData<typeof loader>()
  return (
    <>
      <Box
        key={allOrderSevice}
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
                    // i want displayed scrollbar if user use mouse for scrolling, but if scrollbar not none is a no clear ,
                    display: 'none',
                  },
                }}
                mb={'10'}
              >
                <TabList mx={5}>
                  <Tab
                    onClick={() => handleClickTab(0)}
                    fontWeight={activeTab === 0 ? '700' : '500'}
                  >
                    Semua
                  </Tab>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab
                        onClick={() => handleClickTab(1)}
                        fontWeight={activeTab === 1 ? '700' : '500'}
                      >
                        {/* NOTIFICATION ORDER */}

                        <Text
                          my={4}
                          color={'white'}
                          bg={'#0086B4'}
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
                      <Tab
                        onClick={() => handleClickTab(2)}
                        fontWeight={activeTab === 2 ? '700' : '500'}
                      >
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'#0086B4'}
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
                      <Tab
                        onClick={() => handleClickTab(3)}
                        fontWeight={activeTab === 3 ? '700' : '500'}
                      >
                        {/* NOTIFICATION ORDER  !*/}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'#0086B4'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          {notificationCount}{' '}
                          {/* INSERT YOUR NOTIF DATA HERE */}
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
                      <Tab
                        onClick={() => handleClickTab(4)}
                        fontWeight={activeTab === 4 ? '700' : '500'}
                      >
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'#0086B4'}
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
                      <Tab
                        onClick={() => handleClickTab(5)}
                        fontWeight={activeTab === 5 ? '700' : '500'}
                      >
                        <Flex gap={1.5} my={4}>
                          <Text>Pesanan </Text> <Text> Selesai</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Tab
                    onClick={() => handleClickTab(6)}
                    fontWeight={activeTab === 6 ? '700' : '500'}
                  >
                    Dibatalkan
                  </Tab>
                </TabList>
              </Box>
            </Box>

            <Box my={5} paddingBottom={'100px'} background={'white'}>
              <TabPanels>
                {/* YOUR CARD START IN HERE ! */}

                <ScrollBox>
                  <TabPanel>
                    <UnpaidAllCard />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <UnpaidCard />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardNewOrderBa />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardReadyToShip />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel></TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardSuccess />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardCenceled />
                  </TabPanel>
                </ScrollBox>

                {/* END CARD */}
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
