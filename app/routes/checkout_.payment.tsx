import {
  Box,
  Button,
  Card,
  FormControl,
  FormLabel,
  Image,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import type { ActionArgs} from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import React from 'react';

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const order_id = formData.get('order_id');
    const reg_name = formData.get('reg_name');
    const bank_name = formData.get('bank_name');
    const date = formData.get('date');
    const amount = formData.get('amount');
    const file_transfer = formData.get('file_transfer');

    const data = {
      order_id,
      reg_name,
      bank_name,
      date,
      amount,
      file_transfer,
    };

    console.log(data);
  }

  return redirect(`/checkout/transfer/confirm`);
};

export default function TransferPayment() {
  return (
    <Box>
      <Box
        mt={5}
        display={'flex'}
        flexDir={'column'}
        alignItems={'center'}
        marginInline={['10%', '15%', '20%', '25%']}
      >
        <Box gap={2} display={'flex'} alignItems={'center'}>
          <Image
            borderRadius={'full'}
            boxSize={'100px'}
            src="https://scontent.fcgk6-2.fna.fbcdn.net/v/t39.30808-6/218216962_1117994121937500_3381637943147376984_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a2f6c7&_nc_eui2=AeFT_7yyPIn5Hs-bulZWO2RzumKs9VAwotC6Yqz1UDCi0NSeXr2kIVhzZkCN5V1aRwNsfIwkvIxuUFPLdK0rwAuv&_nc_ohc=VzZ_NpN6Gv0AX8Cq5xb&_nc_ht=scontent.fcgk6-2.fna&oh=00_AfBI_Q-jWgr22EcHjq6l2so-vhLoHDuYngxCfWyCAD3vtQ&oe=64FE548E"
            alt=""
          />
          <Text fontWeight={'bold'} color={'#3b5355'} fontSize={'40px'}>
            Cave
          </Text>
        </Box>
        <Text fontWeight={'bold'} fontSize={'xl'}>
          Konfirmasi Pembayaran
        </Text>
        <Card w={'100%'} marginBlock={'20px'} boxShadow={'dark-lg'}>
          <Form method="post">
            <Box p={6} display={'flex'} flexDir={'column'} gap={3}>
              <FormControl isRequired>
                <FormLabel>Order ID</FormLabel>
                <Input name="order_id" type="number" placeholder="" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Atas Nama Rekening</FormLabel>
                <Input name="reg_name" type="text" placeholder="" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Transfer ke</FormLabel>
                <Select name="bank_name">
                  <option value={''} hidden>
                    Pilih salah satu
                  </option>
                  <option>PT. Bank Mandiri (Persero) Tbk</option>
                  <option>PT. Bank Rakyat Indonesia (Persero) Tbk</option>
                  <option>PT. Bank Syariah Indonesia Tbk</option>
                  <option>PT. Bank Mega Tbk</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Tanggal Transfer</FormLabel>
                <Input name="date" type="date" placeholder="" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Jumlah Transfer</FormLabel>
                <Input name="amount" type="number" placeholder="" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Bukti Transfer</FormLabel>
                <Input name="file_transfer" p={1} type="file" placeholder="" />
              </FormControl>
              <Button
                type="submit"
                _hover={{ bg: '#092651' }}
                bg={'#007bff'}
                color={'white'}
                width={'100%'}
              >
                Kirim
              </Button>
            </Box>
          </Form>
        </Card>
      </Box>
    </Box>
  );
}
