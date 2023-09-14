import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import {
  BsCreditCard2FrontFill,
  BsFillCalendarDateFill,
  BsDownload,
} from 'react-icons/bs';
import { PiWarningCircleFill, PiWarningCircleBold } from 'react-icons/pi';
import { MdArrowDropDownCircle, MdCreditScore } from 'react-icons/md';
import { ChevronDownIcon } from '@chakra-ui/icons';
import DashboardPopup from '~/components/PopupDashboard';
import {
  createWithdraw,
  deleteWithdraw,
  getBankList,
} from '~/modules/dashboard/dashboard.service';
import { useLoaderData } from '@remix-run/react';
import NavbarDashboard from '../modules/dashboard/components/navbarDashboard';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

// import React, { useState } from "react";

export async function loader(storeId: string) {
  return await getBankList(storeId);
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const actionType = formData.get('actionType');
  const amount = +(formData.get('amount') as string);
  const bankAccount = formData.get('bankAccount');
  const approvedById = formData.get('approvedById');
  const storeId = formData.get('storeId');
  const bankId = formData.get('bankId');
  const withdrawId = formData.get('withdrawId');

  if (actionType === 'create' && amount && bankAccount) {
    const createdWithdraw = await createWithdraw(
      {
        store: {
          connect: { id: storeId },
        },
        amount: amount.toString(),
        status: 'REQUEST',
        bankAccount: {
          connect: { id: bankId },
        },
      },
      bankId as string,
      storeId as string,
      approvedById as string
    );

    console.log('Withdraw created:', createdWithdraw);

    return redirect('/dashboard');
  }

  if (actionType === 'delete' && withdrawId) {
    await deleteWithdraw(withdrawId as string);
    return redirect('/dashboard');
  }

  return redirect('/dashboard');
}

export default function Dashboard() {
  const dataBank = useLoaderData<typeof loader>();

  return (
    <>
      <NavbarDashboard />
      <Box bg={'#f2f5f7'} p={4}>
        <Box p={3}>
          <Text fontWeight={'bold'} fontSize={'18px'} mb={5} color={'#656565'}>
            Credit Dashboard
          </Text>
          <SimpleGrid minChildWidth={'250px'} spacing={'7'}>
            <Box
              display={'flex'}
              boxShadow={'md'}
              h={'130px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Text fontSize={'13px'}>Current Balance</Text>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                Rp. 5.000.000,
              </Text>
              <DashboardPopup dataBank={dataBank} />
            </Box>
            <Box
              display={'flex'}
              h={'130px'}
              boxShadow={'md'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={4}
            >
              <Text fontSize={'30px'} color={'#34bfa3'}>
                <BsCreditCard2FrontFill />
              </Text>
              <Text fontSize={'13px'}>Penarikan sedang dalam proses</Text>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#656565'}>
                Rp.0
              </Text>
            </Box>
            <Box
              display={'flex'}
              h={'130px'}
              boxShadow={'md'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={4}
            >
              <Text fontSize={'30px'} color={'#34bfa3'}>
                <BsCreditCard2FrontFill />
              </Text>
              <Flex justifyContent={'space-between'}>
                <Flex alignItems={'center'}>
                  <Text fontSize={'13px'} mr={1}>
                    Saldo Tertahan{' '}
                  </Text>
                  <PiWarningCircleFill />
                </Flex>
                <Box>
                  <Text
                    fontSize={'13px'}
                    mr={1}
                    color={'blue.600'}
                    fontWeight={'bold'}
                  >
                    Lihat Semua
                  </Text>
                </Box>
              </Flex>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#656565'}>
                Rp.0
              </Text>
            </Box>
            <Box
              display={'flex'}
              h={'130px'}
              boxShadow={'md'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={4}
            >
              <Text fontSize={'30px'} color={'#34bfa3'}>
                <BsCreditCard2FrontFill />
              </Text>
              <Flex justifyContent={'space-between'}>
                <Text fontSize={'13px'} mr={1}>
                  Tagihan Belum Dibayar{' '}
                </Text>
                <Box>
                  <Text
                    fontSize={'13px'}
                    mr={1}
                    color={'blue.600'}
                    fontWeight={'bold'}
                  >
                    Lihat Semua
                  </Text>
                </Box>
              </Flex>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#ed1c24'}>
                Rp.0
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
        <Box
          bg={'white'}
          boxShadow={'md'}
          m={'22px 10px'}
          p={'40px 15px'}
          pt={3}
          borderRadius={10}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text
              fontWeight={'bold'}
              fontSize={'18px'}
              mb={5}
              color={'#656565'}
            >
              Report Period
            </Text>
            <Button
              display={'flex'}
              flexDirection={'row'}
              borderRadius={20}
              border={'1px solid'}
              bg={'white'}
            >
              <Text fontSize={'15px'} color={'#00579e'}>
                <BsFillCalendarDateFill />
              </Text>
              <Text fontSize={'13px'} m={1} color={'gray.600'}>
                30 Hari Terakhir
              </Text>
              <Text fontSize={'17px'} color={'#00579e'}>
                <MdArrowDropDownCircle />
              </Text>
            </Button>
          </Flex>
          <SimpleGrid minChildWidth={'250px'} spacing={'7'}>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Penarikan Selesai</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Pendapatan COD</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Cashback Pengiriman</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Pendapatan E-Payment</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Refund Biaya Pengiriman</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Kredit Lainnya</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Klaim Pengiriman</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Pembayaran Penagiagan</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>

        <SimpleGrid minChildWidth={'400px'}>
          <Flex justifyContent={'space-between'} p={3}>
            <Menu>
              <MenuButton
                as={Button}
                bg={'white'}
                border={'1px solid'}
                color={'#656565'}
                fontSize={'13px'}
                borderColor={'gray.400'}
                leftIcon={<BsDownload />}
                rightIcon={<ChevronDownIcon />}
              >
                Ekpor
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
            <Flex gap={5}>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={'white'}
                  border={'1px solid'}
                  color={'#656565'}
                  fontSize={'13px'}
                  borderColor={'gray.400'}
                  rightIcon={<ChevronDownIcon />}
                >
                  All Type
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={'white'}
                  border={'1px solid'}
                  color={'#656565'}
                  fontSize={'13px'}
                  borderColor={'gray.400'}
                  rightIcon={<ChevronDownIcon />}
                >
                  All Status
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={'white'}
                  border={'1px solid'}
                  color={'gray.400'}
                  fontSize={'13px'}
                  borderColor={'gray.400'}
                >
                  Order ID
                </MenuButton>
              </Menu>
            </Flex>
          </Flex>
        </SimpleGrid>

        <SimpleGrid p={3}>
          <Box
            display="flex"
            borderRadius={5}
            bg={'white'}
            border={'1px solid'}
            color={'gray.500'}
            fontSize={'13px'}
            borderColor={'gray.400'}
            justifyContent={'space-between'}
            p={2}
          >
            <Text fontWeight={'bold'}>No.</Text>
            <Text fontWeight={'bold'}>Deskripsi</Text>
            <Text fontWeight={'bold'}>Nilai</Text>
            <Text fontWeight={'bold'}>Status</Text>
            <Text fontWeight={'bold'}>Tipe</Text>
            <Text fontWeight={'bold'}>Tanggal</Text>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={5}
            bg={'white'}
            border={'1px solid'}
            color={'#28a745'}
            fontSize={'13px'}
            borderColor={'gray.400'}
            mt={3}
            h={'250px'}
          >
            <Flex alignItems={'center'}>
              <PiWarningCircleBold />
              <Text> Tidak ada aktivitas dalam rentan tanggal ini</Text>
            </Flex>
          </Box>
        </SimpleGrid>
      </Box>
    </>
  );
}
