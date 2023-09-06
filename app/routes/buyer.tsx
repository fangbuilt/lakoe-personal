import {
  Box,
  Button,
  ChakraProvider,
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
  useMediaQuery,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';
import { PiShoppingCartThin } from 'react-icons/pi';

function PaymentConfirmation() {
  const [orderId, setOrderId] = useState('');
  const [accountName, setAccountName] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferDate, setTransferDate] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Order ID:', orderId);
    console.log('Atas Nama Rekening:', accountName);
    console.log('Transfer Ke:', transferTo);
    console.log('Jumlah Transfer:', transferAmount);
    console.log('Tanggal Transfer:', transferDate);
    console.log('File yang Diunggah:', file);
  };

  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  return (
    <Flex direction="column" align="center">
      <Box fontSize={'100px'} mt={'10px'}>
        <PiShoppingCartThin />
      </Box>
      <Heading fontSize="2xl" textAlign="center">
        KONFIRMASI PEMBAYARAN
      </Heading>

      <Container
        bg={'whiteAlpha.50'}
        p={10}
        mt={'3%'}
        mb={'2%'}
        boxShadow="0px 0px 3px 1px rgba(3, 3, 3, 0.3)"
        borderRadius={'3px'}
        width={isSmallScreen ? '90%' : '50%'}
      >
        <Form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="order-id" isRequired>
              <FormLabel>Order ID</FormLabel>
              <Input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Masukkan Order ID Anda"
              />
            </FormControl>
            <FormControl id="account-name" isRequired>
              <FormLabel>Atas Nama Rekening</FormLabel>
              <Input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                placeholder="Pemilik Rekening"
              />
            </FormControl>
            <FormControl id="transfer-to" isRequired>
              <FormLabel>Transfer Ke</FormLabel>
              <Select
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              >
                <option value="" hidden>
                  Pilihan Bank
                </option>
                <option value="bank-a">Bank BRI</option>
                <option value="bank-b">Bank BCA</option>
                <option value="bank-c">Bank BNI</option>
              </Select>
            </FormControl>
            <FormControl id="transfer-date" isRequired>
              <FormLabel>Tanggal Transfer</FormLabel>
              <Input
                type="date"
                value={transferDate}
                onChange={(e) => setTransferDate(e.target.value)}
                placeholder="Pilih Tanggal Transfer"
              />
            </FormControl>
            <FormControl id="transfer-amount" isRequired>
              <FormLabel>Jumlah Transfer</FormLabel>
              <InputGroup>
                <Input
                  type="number"
                  value={transferAmount}
                  onChange={(e) => setTransferAmount(e.target.value)}
                  placeholder="Jumlah Transfer"
                />
                <InputRightElement width="4.5rem">IDR</InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="upload-proof" isRequired mb={5}>
              <FormLabel>Bukti Transfer</FormLabel>
              <Box position={'relative'} mb={5} alignItems={'center'}>
                <Input
                  position={'absolute'}
                  p={1}
                  placeholder="medium size"
                  size="md"
                  type="file"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={handleFileChange}
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
    </Flex>
  );
}
function App() {
  return (
    <ChakraProvider>
      <PaymentConfirmation />
    </ChakraProvider>
  );
}

export default App;
