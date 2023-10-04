import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form, useLoaderData, useParams } from '@remix-run/react';
import React, { useState } from 'react';
import { PiShoppingCartThin } from 'react-icons/pi';
import { db } from '../libs/prisma/db.server';
import moment from 'moment';
import { MootaOrderStatusUpdate } from '~/modules/order/order.service';
import { MootaOrderSchema } from '~/modules/order/order.schema';

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const invoiceId = formData.get('invoiceId');
    // const invoice = formData.get("invoice");
    const bank = formData.get('bank');
    const createdAt = formData.get('createdAt');
    const amount = formData.get('amount') as string;
    const attachment = formData.get('attachment');

    const amountNumber = amount ? parseFloat(amount) : null;

    const apiData: number | any = await fetchWebhookStatusWithRetry();

    const apiDataString = apiData.toString();

    const latestAmount = apiData ? parseFloat(apiDataString) : null;

    if (amountNumber === latestAmount) {
      console.log('data amount berhasil !');
      const MootaOrder = MootaOrderSchema.parse({
        amount: latestAmount,
      });
      await MootaOrderStatusUpdate(MootaOrder);
    } else {
      console.log('AMOUNT NOT FOUND !');
    }
    const data = {
      invoiceId,
      bank,
      createdAt,
      amount,
      attachment,
    };
    console.log(data);

    // await db.confirmationPayment.create({ data });
  }

  return redirect(`/checkout/transfer/confirm`);
};

export async function loader({ params }: ActionArgs) {
  const data = params;
  return await db.invoice.findUnique({
    where: {
      id: data.invoiceId as string,
    },
    include: {
      user: true,
    },
  });
}

const maxRetryAttempts = 5;
const baseRetryInterval = 5 * 60 * 1000;
const maxRetryInterval = 24 * 60 * 60 * 1000;

export async function fetchWebhookStatusWithRetry(
  retryCount = 0,
  retryInterval = baseRetryInterval
) {
  let confirmationPay = null;
  try {
    const bank_id = process.env.ID_BANK as string;
    const token = process.env.TOKEN_ACCOUNT_BANK as string;

    const startDate = moment()
      .subtract(2, 'days')
      .format('YYYY-MM-DD') as string;
    const endDate = moment().format('YYYY-MM-DD') as string;

    const url = `https://app.moota.co/api/v2/mutation?bank=${bank_id}&start_date=${startDate}&end_date=${endDate}`;

    const headers = {
      Location: '/api/v2/mutation{?bank}&{?start_date}&{?end_date}',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (response.ok) {
      let responseData = await response.json();

      if (responseData.data && responseData.data.length > 0) {
        // descending date
        responseData.data.sort((a: any, b: any) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        const latestTransaction = responseData.data[0];

        const amount = latestTransaction.amount as number;

        confirmationPay = amount;
      }
    }
  } catch (error) {
    console.error('Kesalahan dalam permintaan API:', error);

    if (retryCount < maxRetryAttempts - 1) {
      //  interval eksponensial
      retryInterval *= 2;
      retryInterval = Math.min(retryInterval, maxRetryInterval);

      console.log(
        `Percobaan ke-${retryCount + 1} akan dilakukan dalam ${
          retryInterval / 1000
        } detik.`
      );
      await new Promise((resolve) => setTimeout(resolve, retryInterval));
      return fetchWebhookStatusWithRetry(retryCount + 1, retryInterval);
    } else {
      console.error(
        'Percobaan retry telah mencapai batas. Tidak dapat mengambil status webhook.'
      );
      throw new Error('Percobaan retry telah mencapai batas.');
    }
  }
  return confirmationPay;
}

export default function TransferPayment() {
  const { invoiceId } = useParams();

  const [file] = useState<File | null>(null);
  const item = useLoaderData<typeof loader>();

  return (
    <Flex direction="column" align="center">
      <Box fontSize={'100px'} mt={'10px'}>
        <PiShoppingCartThin />
      </Box>

      <Heading fontSize="2xl" textAlign="center">
        KONFIRMASI PEMBAYARAN
      </Heading>

      <Container
        width={'500px'}
        bg={'whiteAlpha.50'}
        p={10}
        mt={'3%'}
        mb={'2%'}
        boxShadow="0px 0px 3px 1px rgba(3, 3, 3, 0.3)"
        borderRadius={'3px'}
      >
        <Form method="post">
          <Stack spacing={4}>
            <FormControl id="invoiceId" isRequired>
              <FormLabel>Order ID</FormLabel>
              <Input
                name="invoiceId"
                value={item?.id}
                type="text"
                // placeholder={item?.id}
              />
            </FormControl>
            <FormControl id="invoice" isRequired>
              <FormLabel>Atas Nama Rekening</FormLabel>
              <Input
                name="invoice"
                type="text"
                value={item?.receiverName}
                // placeholder={item?.receiverName}
              />
            </FormControl>
            <FormControl id="bank" isRequired>
              <FormLabel>Transfer Ke</FormLabel>
              <Select name="bank">
                <option value="" hidden>
                  Pilihan Bank
                </option>
                <option>PT. Bank Mandiri (Persero) Tbk</option>
                <option>PT. Bank Rakyat Indonesia (Persero) Tbk</option>
                <option>PT. Bank Syariah Indonesia Tbk</option>
                <option>PT. Bank Mega Tbk</option>
              </Select>
            </FormControl>
            <FormControl id="transfer-date" isRequired>
              <FormLabel>Tanggal Transfer</FormLabel>
              <Input
                name="createdAt"
                type="date"
                placeholder="Pilih Tanggal Transfer"
              />
            </FormControl>
            <FormControl id="transfer-amount" isRequired>
              <FormLabel>Jumlah Transfer</FormLabel>
              <InputGroup>
                <Input
                  name="amount"
                  type="number"
                  placeholder="Jumlah Transfer"
                />
                <InputRightElement width="4.5rem">IDR</InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="upload-proof" isRequired mb={5}>
              <FormLabel>Bukti Transfer</FormLabel>
              <Box position={'relative'} mb={5} alignItems={'center'}>
                <Input
                  name="attachment"
                  position={'absolute'}
                  p={1}
                  placeholder="medium size"
                  size="md"
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                />
              </Box>
            </FormControl>
            {file && (
              <Image
                src={URL.createObjectURL(file)}
                alt="Bukti Transfer"
                maxH="100px"
              />
            )}
            <Button mt={'10px'} type="submit" colorScheme="blue" width={'100%'}>
              Kirim
            </Button>
          </Stack>
        </Form>
      </Container>
      <Box display={'none'}>
        <Text>{invoiceId}</Text>
      </Box>
    </Flex>
  );
}
