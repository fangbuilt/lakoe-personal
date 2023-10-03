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
  Input,
  FormControl,
  Select,
  VStack,
} from '@chakra-ui/react';

import { Link } from '@remix-run/react';
import moment from 'moment';
import { useState } from 'react';
import AdminDeclinedPreview from './AdminDeclinedPreview';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function AdminDeclined({ dataDeclined }: any) {
  const filteredDataDeclined = dataDeclined
    .map((item: any) => {
      if (item.withdraw.status === 'DECLINED') {
        return item;
      }
    })
    .filter(Boolean);

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const withdrawalCountByDeclined = filteredDataDeclined.length;

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
        padding={'10px'}
        borderRadius={'15px'}
        boxShadow="base"
        p="6"
        rounded="md"
        bg="white"
        overflow={'auto'}
      >
        <Box>
          <Tabs defaultIndex={5}>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'16px'}>
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
                      <Link to={'/dashboardAdminWithdraw'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            color={'teal'}
                            borderRadius={'full'}
                            fontSize={'17px'}
                            marginRight={2}
                            mb={1}
                          >
                            <CheckCircleIcon />
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Semua</Text>
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
                            color={'teal'}
                            borderRadius={'full'}
                            fontSize={'17px'}
                            marginRight={2}
                            mb={1}
                          >
                            <CheckCircleIcon />
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Request</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminApproved'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            color={'teal'}
                            borderRadius={'full'}
                            fontSize={'17px'}
                            marginRight={2}
                            mb={1}
                          >
                            <CheckCircleIcon />
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Approved</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminProcessing'}>
                        <Tab>
                          {/* NOTIFICATION ORDER */}
                          <Text
                            color={'teal'}
                            borderRadius={'full'}
                            fontSize={'17px'}
                            marginRight={2}
                            mb={1}
                          >
                            <CheckCircleIcon />
                          </Text>
                          {/* END NOTIFICATION ORDER */}

                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Processing</Text>
                          </Flex>
                        </Tab>
                      </Link>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Link to={'/adminSuccess'}>
                        <Tab>
                          {/* NOTIFICATION ORDER  !*/}
                          <Text
                            color={'teal'}
                            borderRadius={'full'}
                            fontSize={'17px'}
                            marginRight={2}
                            mb={1}
                          >
                            <CheckCircleIcon />
                          </Text>
                          {/* END NOTIFICATION ORDER */}

                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Success</Text>
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
                            my={2}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'18px'}
                            fontSize={'12px'}
                            marginRight={2}
                          >
                            {withdrawalCountByDeclined}{' '}
                          </Text>
                          {/* END NOTIFICATION ORDER */}
                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Declined</Text>
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
        <Flex gap={'10px'} margin={'15px'}>
          <VStack width={'50%'}>
            <FormControl>
              <Select
                value={selectedOption}
                onChange={handleSelectChange}
                placeholder="Urutkan"
                fontSize={'12px'}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
          <Input fontSize={'12px'} placeholder="Filter" width={'50%'} />
        </Flex>

        {/* Table */}
        <Box>
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr fontSize={'12px'}>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Nomor Penarikan
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Tanggal
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Nama Store
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Jumlah Penarikan
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Status
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredDataDeclined.map((item: any) => (
                  <Tr key={item.id}>
                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      123ASD
                    </Td>
                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format(
                        'LLLL'
                      )}
                    </Td>
                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {item.store?.name}
                    </Td>
                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {formatRupiah(item.withdraw?.amount)}
                    </Td>
                    <Td margin={'2px 0'}>
                      <Text>
                        {item.withdraw.status === 'DECLINED' && (
                          <Text
                            bg={'RED'}
                            color={'white'}
                            borderRadius={'15px'}
                            px={'5px'}
                            fontSize={'10px'}
                            textAlign={'center'}
                          >
                            DECLINED
                          </Text>
                        )}
                      </Text>
                    </Td>

                    <Td padding={'5px'}>
                      <Text
                        color={'black'}
                        textAlign={'center'}
                        borderRadius={'15px'}
                        cursor={'pointer'}
                        px={'5px'}
                        fontSize={'10px'}
                      >
                        <AdminDeclinedPreview dataDeclined={item} />
                      </Text>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
