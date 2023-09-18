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
  Select,
  FormControl,
  VStack,
  FormLabel,
} from '@chakra-ui/react';

import PreviewWithdraw from './AdminRequestPopup';
import { Link } from '@remix-run/react';
import { useState } from 'react';

export default function AdminAll() {
  interface SelectOption {
    value: string;
    label: string;
  }

  const [selectedOption, setSelectedOption] = useState<string>('');

  const options: SelectOption[] = [
    { value: 'All', label: 'All' },
    { value: 'Request', label: 'Request' },
    { value: 'Processing', label: 'Processing' },
    { value: 'Success', label: 'Success' },
    { value: 'Declined', label: 'Declined' },
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedOption(newValue);
  };

  return (
    <>
      <Box
        width={'100%'}
        mr={'10px'}
        padding={'10px'}
        borderRadius={'15px'}
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
      >
        <Box>
          <Tabs defaultIndex={0}>
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
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/dashboardAdmin'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text>Semua</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminRequest'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text>Request</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'teal'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          1 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Link to={'/adminProcessing'}>
                            <Text>Processing</Text>
                          </Link>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminSuccess'}>
                        <Tab>
                          {/* NOTIFICATION ORDER  !*/}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}

                          <Flex gap={1.5}>
                            <Text>Success</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminDeclined'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            my={4}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'24px'}
                            fontSize={14}
                            marginRight={2}
                          >
                            1 {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text>Declined</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>
                </TabList>
              </Box>
              {/* </Tabs> */}
            </Box>
          </Tabs>
        </Box>

        {/* Sort By */}
        {/* <Flex gap={"10px"} margin={"15px"}>
          <Input placeholder="Urutkan" />
          <Input placeholder="Filter" />
        </Flex> */}

        <VStack spacing={4} mt={'15px'} mx={5}>
          <FormControl>
            <FormLabel>Filter by status</FormLabel>
            <Select
              value={selectedOption}
              onChange={handleSelectChange}
              // placeholder="Filter by status"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Text>Status selected: {selectedOption}</Text>
          </Box>
        </VStack>

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
                      bg={'yellow'}
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
                      cursor={'pointer'}
                    >
                      <PreviewWithdraw />
                    </Text>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
