import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { Link, useLoaderData, useParams } from '@remix-run/react';
import data from '../utils/dummy.json';
import type { ActionArgs } from '@remix-run/node';
import { db } from '~/libs/prisma/db.server';

export async function loader({ params }: ActionArgs) {
  const data = params;
  return await db.invoice.findUnique({
    where: {
      id: data.invoiceId,
    },
    include: {
      payment: true,
    },
  });
}

export default function PayTransfer() {
  const price = data.map((item) => item.price);
  const tagPrice = data.map((item) => item.tagPrice);
  const { onCopy, hasCopied } = useClipboard(`${price} ${tagPrice}`);
  const { invoiceId } = useParams();
  const item = useLoaderData<typeof loader>();

  return (
    <>
      <Box marginInline={'10%'}>
        <Card boxShadow={'dark-lg'} m={5}>
          <Box
            p={9}
            gap={3}
            display={'flex'}
            flexDirection={'column'}
            textAlign={'center'}
          >
            <Center>
              <Box>
                <Heading
                  paddingInline={5}
                  fontSize={'2xl'}
                  mt={'5'}
                  textAlign={'center'}
                >
                  Terimakasih Sudah Melakukan Order {item?.invoiceNumber} di
                  Lakoe
                </Heading>
                <Text textAlign={'center'} mt={'24px'}>
                  Untuk menyelesaikan proses order, silahkan transfer sejumlah
                </Text>
                <Center textAlign={'center'} mt={'24px'} color={'green.400'}>
                  <Heading>Rp{item?.price.toLocaleString('id-ID')}.</Heading>
                  {/* <Heading color={"orange.400"}>{item.tagPrice}</Heading> */}
                </Center>
                <Center mt={3}>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    bg={'yellow.400'}
                    borderRadius={5}
                    gap={2}
                    p={'8px'}
                  >
                    <Text fontWeight={'bold'}>Penting!</Text>
                    <Text>
                      Mohon Transfer sesuai sampai dengan 3 digit karakter
                    </Text>
                  </Box>
                </Center>
                <Box textAlign={'center'} mt={5}>
                  <Button border={'1px'} onClick={onCopy}>
                    {hasCopied ? 'Berhasil Disalin !' : 'Salin Jumlah'}
                  </Button>
                  <Text mt={5}>ke bank berikut ini ya kak:</Text>
                  <Box lineHeight={'9'}>
                    <Text>Rek. {item?.payment?.bank} </Text>
                    {/* <Text>{item?.payment?.amount}</Text> */}
                    {/* <Text>A.n {item?.payment?.status}</Text> */}
                  </Box>
                  <Box mt={'20px'}>
                    <Text>Konfirmasikan Pembayaran Anda di:</Text>
                    <Link to={`/payment/${invoiceId}`}>
                      <Text display={'inline'} color={'blue'} ms={1}>
                        Konfirmasi Pembayaran
                      </Text>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Center>
          </Box>
          <Box bg={'#6acbd4'} borderBottomRadius={'6px'} p={3}></Box>
        </Card>
      </Box>
      <Box
        textAlign={'center'}
        display={'flex'}
        flexDirection={'column'}
        m={'50px'}
        justifyContent={'center'}
      >
        <Box gap={3} justifyContent={'center'} display={'flex'}>
          <Text fontWeight={'bold'} fontStyle={'italic'}>
            Powered by
          </Text>
          <Text>Lakoe.id</Text>
        </Box>
        <Text>copyright @ 2023</Text>
      </Box>
    </>
  );
}
