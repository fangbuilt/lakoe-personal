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
import ScrollBox from '~/components/ScrollBox';
import type { loader } from '~/routes/order';
import CardCenceled from '~/components/order/CardCanceled';
import CardSucces from '~/components/order/CardSuccesOrder';
import CardReadyToShip from '~/components/order/CardReadyToShip';
import CardInShipping from '~/components/order/CardInShipping';
import { number } from 'zod';
import CardAllOrder from '~/components/order/CardAllOerder';
import UnpaidCard from '~/components/order/CardUnpaid';
import CardNewOrderBa from '~/components/order/CardNewOrderBa';
import CardSuccess from '~/components/CardSuccess';
// import CardSucces from '~/components/order/CardSuccesOrder';
// import UnpaidCard from '~/components/order/CardUnpaid';
// import UnpaidCard from '~/components/order/CardUnpaid';
export function NavOrder({ allOrderSevice }: any) {
  const {
    dataProductReadyToShip,
    unpaidCard,
    getDataInShippings,
    dataInvoice,
  } = useLoaderData<typeof loader>();
  // const {unpaidCard} = useLoaderData<typeof loader>();
  // const notificationCount =
  //   dataProductReadyToShip.dataProductReadyToShip.length > 0
  //     ? dataProductReadyToShip.dataProductReadyToShip.length
  //     : 0;
  const [activeTab, setActiveTab] = useState(0);
  const handleClickTab = (index: number) => {
    setActiveTab(index);
  };
  // const notifCountInShipping = dataProductReadyToShip..length > 0 ? dataProductReadyToShip..length : 0;
  return (
    <>
      <Box
        background={"whitesmoke"}
        style={{ width: "100%", marginLeft: "-5px", marginRight: "50%" }}
      >
        <Box
          background={"white"}
          position={"fixed"}
          top={"50"}
          style={{
            marginTop: "1.3%",
            width: "47.5%",
            height: "100%",
            borderRadius: "10px",
          }}
        >
          <Tabs>
            <Box my={4} mx={5}>
              <Text fontWeight={"bold"} fontSize={"20px"}>
                Daftar Pesanan
              </Text>
            </Box>

            <Box>
              <Box
                display={"flex"}
                overflow={"scroll"}
                sx={{
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                mb={"10"}
              >
                <TabList mx={5}>
                  <Tab
                    onClick={() => handleClickTab(0)}
                    fontWeight={activeTab === 0 ? "700" : "500"}
                  >
                    Semua
                  </Tab>

                  <Box textAlign={"center"}>
                    <Box display={"flex"}>
                      <Tab
                        onClick={() => handleClickTab(1)}
                        fontWeight={activeTab === 1 ? "700" : "500"}
                      >
                        {/* NOTIFICATION ORDER */}

                        <Text
                          my={4}
                          color={"white"}
                          bg={"#0086B4"}
                          borderRadius={"full"}
                          boxSize={"24px"}
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

                  <Box textAlign={"center"}>
                    <Box display={"flex"}>
                      <Tab
                        onClick={() => handleClickTab(2)}
                        fontWeight={activeTab === 2 ? "700" : "500"}
                      >
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={"white"}
                          bg={"#0086B4"}
                          borderRadius={"full"}
                          boxSize={"24px"}
                          fontSize={14}
                          marginRight={2}
                        >
                          {dataInvoice.length}{' '}
                          {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Pesanan</Text> <Text>Baru</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={"center"}>
                    <Box display={"flex"}>
                      <Tab
                        onClick={() => handleClickTab(3)}
                        fontWeight={activeTab === 3 ? "700" : "500"}
                      >
                        {/* NOTIFICATION ORDER  !*/}
                        <Text
                          my={4}
                          color={"white"}
                          bg={"#0086B4"}
                          borderRadius={"full"}
                          boxSize={"24px"}
                          fontSize={14}
                          marginRight={2}
                        >
                          {dataProductReadyToShip.length}
                          {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Siap </Text> <Text>Dikirim</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={"center"}>
                    <Box display={"flex"}>
                      <Tab
                        onClick={() => handleClickTab(4)}
                        fontWeight={activeTab === 4 ? "700" : "500"}
                      >
                        {/* NOTIFICATION ORDER */}

                        <Text
                          my={4}
                          color={"white"}
                          bg={"#0086B4"}
                          borderRadius={"full"}
                          boxSize={"24px"}
                          fontSize={14}
                          marginRight={2}
                        >
                          {getDataInShippings.length}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Dalam </Text> <Text> Pengiriman</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={"center"}>
                    <Box display={"flex"}>
                      <Tab
                        onClick={() => handleClickTab(5)}
                        fontWeight={activeTab === 5 ? "700" : "500"}
                      >
                        <Flex gap={1.5} my={4}>
                          <Text>Pesanan </Text> <Text> Selesai</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Tab
                    onClick={() => handleClickTab(6)}
                    fontWeight={activeTab === 6 ? "700" : "500"}
                  >
                    Dibatalkan
                  </Tab>
                </TabList>
              </Box>
            </Box>

            <Box my={5} paddingBottom={"100px"} background={"white"}>
              <TabPanels>
                {/* YOUR CARD START IN HERE ! */}

                <ScrollBox>
                  <TabPanel>
                    <CardAllOrder />
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
                  <TabPanel>
                    <CardInShipping/>
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardSuccess />
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    <CardSucces />
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
