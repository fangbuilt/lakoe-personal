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
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import { PiShoppingCartThin } from 'react-icons/pi';

function PaymentConfirmation() {
  const [file] = useState<File | null>(null);

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
        w={'80%'}
        p={10}
        mt={'3%'}
        mb={'2%'}
        boxShadow="0px 0px 3px 1px rgba(3, 3, 3, 0.3)"
        borderRadius={'3px'}
      >
        <Form method="post">
          <Stack spacing={4}>
            <FormControl id="order-id" isRequired>
              <FormLabel>Order ID</FormLabel>
              <Input
                name="orderId"
                type="text"
                placeholder="Masukkan Order ID Anda"
              />
            </FormControl>
            <FormControl id="account-name" isRequired>
              <FormLabel>Atas Nama Rekening</FormLabel>
              <Input
                name="accountName"
                type="text"
                placeholder="Pemilik Rekening"
              />
            </FormControl>
            <FormControl id="transfer-to" isRequired>
              <FormLabel>Transfer Ke</FormLabel>
              <Select name="transferTo">
                <option value="" hidden>
                  Pilihan Bank
                </option>
                <option value="Bank BRI">Bank BRI</option>
                <option value="Bank BCA">Bank BCA</option>
                <option value="Bank BNI">Bank BNI</option>
              </Select>
            </FormControl>
            <FormControl id="transfer-date" isRequired>
              <FormLabel>Tanggal Transfer</FormLabel>
              <Input
                name="transferDate"
                type="date"
                placeholder="Pilih Tanggal Transfer"
              />
            </FormControl>
            <FormControl id="transfer-amount" isRequired>
              <FormLabel>Jumlah Transfer</FormLabel>
              <InputGroup>
                <Input
                  name="transferAmount"
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
                  name="buktiTransfer"
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
    </Flex>
  );
}

export default PaymentConfirmation;
