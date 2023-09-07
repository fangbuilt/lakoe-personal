import {
  Box,
  Card,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Image,
  Flex,
  Button,
  Img,
  Input,
  InputGroup,
  InputLeftElement,
  Checkbox,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Radio,
  RadioGroup,

} from "@chakra-ui/react";
import ChevronDownIcon from "../assets/icon-pack/arrow-dropdown.svg"
import { useState, useEffect } from "react";
import data from "../tests/utils/dummy.json";
import { Link} from "@remix-run/react";
import SearchProduct from "../assets/icon-pack/search-product.svg";


export default function OrderListTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(data); 
  useEffect(() => {
    const filtered = data.filter((order) =>
      order.titleProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.invoice.toLowerCase().includes(searchQuery.toLowerCase())

    );
    setFilteredOrders(filtered);
  }, [searchQuery]);

  
  return (
    <>
      <Box
        background={"whitesmoke"}
        style={{ width: "100%", marginLeft: "0px", marginRight: "50%"}}
      >
        <Box
          background={"white"}
          position={"fixed"}
          top={"50"}
          style={{ marginTop: "1.3%", width: "47.5%"  , height:"100%",borderRadius:"10px"}}
        >

          <Tabs>
            
            <Box my={4} mx={5}>
              <Text fontWeight={"bold"} fontSize={"20px"}>
                Daftar Pesanan
              </Text>
            </Box>

            <Box>
                <Box display={"flex"} overflow={"scroll"} sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }} >
                  <TabList mx={5}>
                    <Tab>
                    
                      Semua
                    </Tab>
                  </TabList>
                  <TabList mx={5}>
                    <Box textAlign={"center"}>
                      <Box display={"flex"}>
                        <Tab>

                          <Text
                            my={3}
                            color={"white"}
                            bg={"cyan.400"}
                            boxSize={"24px"}
                            borderRadius={"full"}
                            fontSize={14}
                            marginRight={2}
                          >
                            2
                          </Text>

                          <Flex gap={1.5}>
                      <Text  >Belum </Text> <Text> Dibayar</Text> 
                      </Flex>
                        </Tab>
                      </Box>
                    </Box>
                  </TabList>

                  <TabList mx={5}>
                    <Box textAlign={"center"}>
                      <Box display={"flex"}>
                        <Tab>

                          <Text
                            my={3}
                            color={"white"}
                            bg={"cyan.400"}
                            boxSize={"24px"}
                            borderRadius={"full"}
                            fontSize={14}
                            marginRight={2}
                          >
                            2
                          </Text>

                          <Flex gap={1.5}>
                      <Text >Pesanan </Text> <Text>Baru</Text> 
                      </Flex>
                        </Tab>
                      </Box>
                    </Box>
                  </TabList>
                 <TabList mx={5}>
                    <Box textAlign={"center"}>
                      <Box display={"flex"}>
                        <Tab>

                          <Text
                            my={3}
                            color={"white"}
                            bg={"cyan.400"}
                            boxSize={"24px"}
                            borderRadius={"full"}
                            fontSize={14}
                            marginRight={2}
                          >
                            2
                          </Text>

                          <Flex gap={1.5}>
                      <Text >Siap </Text> <Text>Dikirim</Text> 
                      </Flex>
                        </Tab>
                      </Box>
                    </Box>
                  </TabList>
                  <TabList mx={5}>
                    <Box textAlign={"center"}>
                      <Box display={"flex"}>
                        <Tab>

                          <Text
                            my={3}
                            color={"white"}
                            bg={"cyan.400"}
                            boxSize={"24px"}
                            borderRadius={"full"}
                            fontSize={14}
                            marginRight={2}
                          >
                            2
                          </Text>

                          <Flex gap={1.5}>
                         <Text >Dalam </Text> <Text> Pengiriman</Text> 
                          </Flex>
                        </Tab>
                      </Box>
                    </Box>
                  </TabList>
                  <TabList mx={5}>
                    <Tab>
                    
                      Dibatalkan
                    </Tab>
                  </TabList>
                </Box>
              {/* </Tabs> */}
            </Box>
            <hr />

            <Box mr={5} my={3} width={"100%"}>
              <Box display={"flex"} mx={2} justifyContent={"space-between"}>
                <InputGroup mx={3}>
                  <InputLeftElement pointerEvents="none">
                    <Image src={SearchProduct} />
                  </InputLeftElement>
                  <Input type="text" onChange={(e) => setSearchQuery(e.target.value)} placeholder="Cari Pesanan" _placeholder={{ opacity: 1, color: '#909090', fontSize:'14px' }} />
                </InputGroup>
                <Menu closeOnSelect={false} >
              <MenuButton
                as={Button}
                variant="outline"
                bgColor={"white"}
                fontSize={"14px"}
                width={'70%'}
                color={"#909090"}
                fontWeight={"normal"}
                me={2}
              >
                <Text textAlign={"left"} >
                   Kurir
              </Text>
                <Image src={ChevronDownIcon} position={"absolute"} fontSize={"2px"} right={2} top={3} />
              
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Checkbox >GoSend</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >GrabExpress</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >AnterAja</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >JNE</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >J&T</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >Lion Parcel</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >Ninja Xpress</Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox >Pos Indonesia</Checkbox>
                </MenuItem>
              </MenuList>

            </Menu>
      
            <Menu closeOnSelect={false}  >
              <MenuButton
                as={Button}
                variant="outline"
                bgColor={"white"}
                fontSize={"14px"}
                width={'70%'}
                color={"#909090"}
                fontWeight={"normal"}
                ms={3}
              >
                 <Text textAlign={"left"} >
                 Urutkan
              </Text>
              <Image src={ChevronDownIcon} position={"absolute"} fontSize={"2px"} right={2} top={3} />
              </MenuButton>
              <MenuList>
                <MenuItem value={"Buku"}>
                  <RadioGroup defaultValue="0">
                  <Box>
                    <Radio value="0">Semua</Radio>
                  </Box>
                  <Box>
                    <Radio value="1">Paling Baru</Radio>
                  </Box>
                  <Box>
                    <Radio value="2">Paling Lama</Radio>
                  </Box>
                  <Box>
                    <Radio value="3">Respon Tercepat</Radio>
                  </Box>
                  <Box>
                    <Radio value="4">Respon Terlama</Radio>
                  </Box>
                  </RadioGroup>
                </MenuItem>
              </MenuList>
            </Menu>

              </Box>
            </Box>

          <Box my={5} paddingBottom={"100px"} background={"white"}>
              <TabPanels>
              <Box
                  style={{
                    overflowY: "scroll",
                    maxHeight: "700px",

                  }}
                  sx={{
                    "::-webkit-scrollbar": {
                      display: "none",
                    },
                  }}
                  >
                  <TabPanel >
                    
                    {filteredOrders.map((datas, id) => (
                    <Card  mb={5} >
              <Box key={id}  >
                <Box
                  mt={5}  
                  borderTop={"1px"}
                  borderColor={"gray.100"}
                  py={"4"}
                >
                  <Box>
                    <Flex justifyContent={"space-between"} px={2}>
                      <Button
                        bg={"gray.500"}
                        color={"white"}
                        fontWeight={"bold"}
                        colorScheme="gray.600"
                        size={"sm"}
                        pointerEvents={"none"}
                      >
                        Pesanan Selesai
                      </Button>

                      <Link to={`http://wa.me/${datas.telephone}`}>
                        <Button bg={'transparent'} border={'1px solid #D5D5D5'} borderRadius={"full"} fontSize={'14px'}>Hubungi Pembeli</Button>
                      </Link>
                    </Flex>
                    <Text my={1} fontSize={'14px'} color={"gray.400"} px={2}>
                      {datas.invoice}
                    </Text>
                    <hr />
                    <Flex justifyContent={"space-between"}>
                      <Box display={"flex"}>
                        <Img
                          src={`${datas.imageProduct}`}
                          w={"62px"}
                          h={"62px"}
                          display={"inline"}
                        />
                        <Text mt={4} id="fm500" fontWeight={"bold"}>
                          {datas.titleProduct}
                          <Text
                            color={"gray.400"}
                            fontWeight={"normal"}
                          >
                            1 Barang
                          </Text>
                        </Text>
                      </Box>
                      <Box me={5} mt={4}>
                        <Flex gap={1}>
                          <Text color={"#909090"} fontSize={'14px'}>Total</Text>
                          <Text color={"#909090"} fontSize={'14px'}>Belanja</Text>
                        </Flex>
                        <Text fontWeight={"bold"} fontSize={'14px'}>
                          Rp.{datas.totalAmount}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              
              </Box>

                    </Card>
            ))}
                  </TabPanel>
                </Box>
              <TabPanel>
                <p>tim bagian pesanan</p>
              </TabPanel>

                  </TabPanels>
                  </Box>
                </Tabs>
          </Box>

      </Box>
    </>
  );
}
