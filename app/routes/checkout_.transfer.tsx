import {
  Box,
  Button,
  Card,
  Center,
  Heading,
  Text,
  useClipboard,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import data from '../utils/dummy.json';
// import type { ITransfer } from '~/interfaces/Transfer';

export default function PayTransfer() {
  // export default function Transfer(props: ITransfer) {
  // const price = props.totalPrice;
  // const { onCopy, hasCopied } = useClipboard(`${price}`);
  // const bank = props.bank;
  const price = data.map((item) => item.price);
  const tagPrice = data.map((item) => item.tagPrice);
  const { onCopy, hasCopied } = useClipboard(`${price} ${tagPrice}`);

  // let bankAccount;

  // if (bank === 'BCA') {
  //   bankAccount = '8812733';
  // } else if (bank === 'BNI') {
  //   bankAccount = '7234798';
  // } else if (bank === 'Mandiri') {
  //   bankAccount = '3858098';
  // }

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
              {data.map((item, id) => (
                <Box key={id}>
                  <Heading
                    paddingInline={5}
                    fontSize={'2xl'}
                    mt={'5'}
                    textAlign={'center'}
                  >
                    Terimakasih Sudah Melakukan Order {item.titleProduct} di
                    Lakoe
                    {/* Terimakasih Sudah Melakukan Order {props.productName} di Lakoe */}
                  </Heading>
                  <Text textAlign={'center'} mt={'24px'}>
                    Untuk menyelesaikan proses order, silahkan transfer sejumlah
                  </Text>
                  <Center textAlign={'center'} mt={'24px'} color={'green.400'}>
                    {/* <Heading>Rp{props.totalPrice}</Heading> */}
                    <Heading>Rp{item.price}.</Heading>
                    <Heading color={'orange.400'}>{item.tagPrice}</Heading>
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
                        Mohon Transfer sesuai sampai dengan 3 digit terakhir
                      </Text>
                      {/* Mohon Transfer sesuai sampai dengan 3 digit karakter */}
                    </Box>
                  </Center>
                  <Box textAlign={'center'} mt={5}>
                    <Button border={'1px'} onClick={onCopy}>
                      {hasCopied ? 'Berhasil Disalin !' : 'Salin Jumlah'}
                    </Button>
                    <Text mt={5}>ke bank berikut ini ya kak:</Text>
                    <Box lineHeight={'9'}>
                      <Text>Rek. {item.payment} </Text>
                      {/* <Text>Rek. {props.bank} </Text> */}
                      <Text>{item.noPayment}</Text>
                      {/* <Text>{bankAccount}</Text> */}
                      <Text>A.n PT.LAKOE INDONESIA</Text>
                      {/* <Text>A.n {item.accountName}</Text> */}
                    </Box>
                    <Box mt={'20px'}>
                      <Text>Konfirmasikan Pembayaran Anda di:</Text>
                      <Link to={`/checkout/payment`}>
                        <Text display={'inline'} color={'blue'} ms={1}>
                          Konfirmasi Pembayaran
                        </Text>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              ))}
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
