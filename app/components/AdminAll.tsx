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
import { Link } from '@remix-run/react';
import moment from 'moment';

export default function AdminAll({ dataWithdrawal }: any) {
  const filteredDataRequest = dataWithdrawal.filter(
    (item: any) => item.status === 'REQUEST'
  );
  const filteredDataProcessing = dataWithdrawal.filter(
    (item: any) => item.status === 'PROCESSING'
  );
  const filteredDataSuccess = dataWithdrawal.filter(
    (item: any) => item.status === 'SUCCESS'
  );
  const filteredDataDeclined = dataWithdrawal.filter(
    (item: any) => item.status === 'DECLINED'
  );
  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const withdrawalCountAll = dataWithdrawal.length;
  const withdrawalCountByRequest = filteredDataRequest.length;
  const withdrawalCountByProcessing = filteredDataProcessing.length;
  const withdrawalCountBySuccess = filteredDataSuccess.length;
  const withdrawalCountByDeclined = filteredDataDeclined.length;
  return (
    <>
      <Box
        width={'100%'}
        mx={'10px'}
        padding={'10px'}
        borderRadius={'15px'}
        border={'1px solid grey'}
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
                            {withdrawalCountAll}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                            {withdrawalCountByRequest}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                          {withdrawalCountByProcessing}{' '}
                          {/* INSERT YOUR NOTIF DATA HERE */}
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
                            {withdrawalCountBySuccess}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
                            {withdrawalCountByDeclined}{' '}
                            {/* INSERT YOUR NOTIF DATA HERE */}
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
              {dataWithdrawal.map((item: any) => (
                <Tbody>
                  <Tr>
                    <Td>{item.id}</Td>
                    <Td>{item.store?.name}</Td>
                    <Td>
                      {moment(item.createdAt, 'YYYY-MM-DD HH:mm:ss').format(
                        'LLLL'
                      )}
                    </Td>
                    <Td>{formatRupiah(item.amount)}</Td>
                    <Td margin={'2px 0'}>
                      <Text
                        padding={'5px 15px'}
                        borderRadius={'15px'}
                        bg={'yellow'}
                        textAlign={'center'}
                      >
                        {item.status}
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
              ))}
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
