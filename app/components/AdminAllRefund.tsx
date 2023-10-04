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
  VStack,
  FormControl,
  Select,
} from '@chakra-ui/react';

import { Link } from '@remix-run/react';
import moment from 'moment';
import React, { useState } from 'react';
import AdminRequestRefundPopup from './AdminRequestRefundPopup';
import AdminApprovedRefundPopup from './AdminApprovedRefundPopup';
import AdminProcessingRefundPopup from './AdminProcessingRefundPopup';
import AdminSuccessRefundPopup from './AdminSuccessRefundPopup';

export default function AdminRequest({ dataRefund }: any) {
  const filteredDataRequest = dataRefund.filter(
    (item: any) => item.status === 'REQUEST'
  );
  const filteredDataApproved = dataRefund.filter(
    (item: any) => item.status === 'APPROVED'
  );
  const filteredDataProcessing = dataRefund.filter(
    (item: any) => item.status === 'PROCESSING'
  );
  const filteredDataSuccess = dataRefund.filter(
    (item: any) => item.status === 'SUCCESS'
  );

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const withdrawalCountAll = dataRefund.length;
  const withdrawalCountByRequest = filteredDataRequest.length;
  const withdrawalCountByApproved = filteredDataApproved.length;
  const withdrawalCountByProcessing = filteredDataProcessing.length;
  const withdrawalCountBySuccess = filteredDataSuccess.length;

  interface SelectOption {
    value: string;
    label: string;
  }

  const [selectedOption, setSelectedOption] = useState<string>('');

  const options: SelectOption[] = [
    { value: 'Status', label: 'Status' },
    { value: 'Time', label: 'Time' },
    { value: 'Saldo Penarikan', label: 'Saldo Penarikan' },
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
          <Tabs defaultIndex={0}>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'16px'}>
                Daftar Refund
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
                      <Link to={'/dashboardAdminRefund'}>
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
                            {withdrawalCountAll}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                      <Link to={'/adminRequestRefund'}>
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
                            {withdrawalCountByRequest}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                      <Link to={'/adminApprovedRefund'}>
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
                            {withdrawalCountByApproved}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                      <Link to={'/adminProcessingRefund'}>
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
                            {withdrawalCountByProcessing}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                      <Link to={'/adminSuccessRefund'}>
                        <Tab>
                          {/* NOTIFICATION ORDER  !*/}
                          <Text
                            my={2}
                            color={'white'}
                            bg={'teal'}
                            borderRadius={'full'}
                            boxSize={'18px'}
                            fontSize={'12px'}
                            marginRight={2}
                          >
                            {withdrawalCountBySuccess}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
                          </Text>
                          {/* END NOTIFICATION ORDER */}

                          <Flex gap={1.5}>
                            <Text fontSize={'12px'}>Success</Text>
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
                    ID Refund
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Penerima
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Tanggal
                  </Th>
                  <Th px={'5px'} fontSize={'10px'} textAlign={'center'}>
                    Amount
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
                {dataRefund.map((item: any) => (
                  <Tr key={item.id}>
                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {item.id}
                    </Td>

                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {item.invoice.receiverName}
                    </Td>

                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format(
                        'LLLL'
                      )}
                    </Td>
                    <Td px={'5px'} fontSize={'10px'} textAlign={'center'}>
                      {formatRupiah(item.amount)}
                    </Td>
                    <Td margin={'2px 0'}>
                      <Text>
                        {item.status === 'REQUEST' && (
                          <Text
                            bg={'Red'}
                            color={'white'}
                            borderRadius={'15px'}
                            px={'5px'}
                            fontSize={'10px'}
                            textAlign={'center'}
                          >
                            REQUEST
                          </Text>
                        )}

                        {item.status === 'APPROVED' && (
                          <Text
                            bg={'blue.600'}
                            color={'white'}
                            borderRadius={'15px'}
                            px={'5px'}
                            fontSize={'10px'}
                            textAlign={'center'}
                          >
                            APPROVED
                          </Text>
                        )}

                        {item.status === 'PROCESSING' && (
                          <Text
                            bg={'teal'}
                            color={'white'}
                            borderRadius={'15px'}
                            px={'5px'}
                            fontSize={'10px'}
                            textAlign={'center'}
                          >
                            PROCESSING
                          </Text>
                        )}

                        {item.status === 'SUCCESS' && (
                          <Text
                            bg={'green'}
                            color={'white'}
                            borderRadius={'15px'}
                            px={'5px'}
                            fontSize={'10px'}
                            textAlign={'center'}
                          >
                            SUCCESS
                          </Text>
                        )}
                      </Text>
                    </Td>

                    <Td padding={'5px'}>
                      {item.status === 'REQUEST' && (
                        <Text
                          color={'black'}
                          textAlign={'center'}
                          borderRadius={'15px'}
                          cursor={'pointer'}
                          px={'5px'}
                          fontSize={'10px'}
                        >
                          <AdminRequestRefundPopup dataRefund={item} />
                        </Text>
                      )}
                      {item.status === 'APPROVED' && (
                        <Text
                          color={'black'}
                          textAlign={'center'}
                          borderRadius={'15px'}
                          cursor={'pointer'}
                          px={'5px'}
                          fontSize={'10px'}
                        >
                          <AdminApprovedRefundPopup dataRefund={item} />
                        </Text>
                      )}
                      {item.status === 'PROCESSING' && (
                        <Text
                          color={'black'}
                          textAlign={'center'}
                          borderRadius={'15px'}
                          cursor={'pointer'}
                          px={'5px'}
                          fontSize={'10px'}
                        >
                          <AdminProcessingRefundPopup dataRefund={item} />
                        </Text>
                      )}
                      {item.status === 'SUCCESS' && (
                        <Text
                          color={'black'}
                          textAlign={'center'}
                          borderRadius={'15px'}
                          cursor={'pointer'}
                          px={'5px'}
                          fontSize={'10px'}
                        >
                          <AdminSuccessRefundPopup dataRefund={item} />
                        </Text>
                      )}
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
