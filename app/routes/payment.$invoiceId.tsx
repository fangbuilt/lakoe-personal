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

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const invoiceId = formData.get('invoiceId');
    // const invoice = formData.get("invoice");
    const bank = formData.get('bank');
    const createdAt = formData.get('createdAt');
    const amount = formData.get('amount');
    const attachment = formData.get('attachment');

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
