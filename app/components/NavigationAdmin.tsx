import {
  Box,
  Tab,
  TabList,
  Tabs,
  Text,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

import PreviewWithdraw from './PopupPreviewWithdraw';

export default function NavigationAdmin() {
  return (
    <>
      <Box
        style={{
          marginTop: '10px',
          background: 'yellow',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box>
          <Tabs>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'20px'}>
                Daftar Penarikan Dana
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
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Request</Text>
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
                          <Text>Processing</Text>
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
                          <Text>Success</Text>
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
                          <Text>Declined</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                </TabList>
              </Box>
              {/* </Tabs> */}
            </Box>
          </Tabs>
        </Box>

        {/* Table */}
        <Box mt={'20px'} display={'flex'} justifyContent={'center'}>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID Withdraw</Th>
                  <Th>Nama Seller</Th>
                  <Th>Tanggal</Th>
                  <Th>Saldo Penarikan</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>21</Td>
                  <Td>Dumbways Store</Td>
                  <Td>5 Sept 2023 15:05</Td>
                  <Td>Rp. 550.000</Td>
                  <Td margin={'2px 0'}>
                    <Text
                      padding={'5px 15px'}
                      borderRadius={'15px'}
                      bg={'white'}
                      textAlign={'center'}
                    >
                      Request
                    </Text>
                  </Td>
                  <Td padding={0}>
                    <Text
                      //   bg={"none"}
                      //   colorScheme="none"
                      color={'black'}
                      textAlign={'center'}
                      borderRadius={'15px'}
                      cursor={'ponter'}
                    >
                      <PreviewWithdraw />
                    </Text>
                  </Td>
                </Tr>
                {/* <Tr>
                  <Td>22</Td>
                  <Td>Dumbways Store</Td>
                  <Td>5 Sept 2023 15:05</Td>
                  <Td>Rp. 650.000</Td>
                  <Td
                    margin={"2px 0"}
                    padding={"2px 10px"}
                    borderRadius={"15px"}
                    bg={"orange.300"}
                    textAlign={"center"}
                  >
                    Request
                  </Td>
                  <Td padding={0}></Td>
                </Tr> */}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Table */}
    </>
  );
}
