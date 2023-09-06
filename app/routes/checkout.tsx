import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useNumberInput,
} from '@chakra-ui/react';
import { redirect, type ActionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const amount1 = formData.get('amount1');
    const amount2 = formData.get('amount2');
    const name = formData.get('username');
    const telp = formData.get('no-telp');
    const email = formData.get('email');
    const address = formData.get('address');
    const provinsi = formData.get('provinsi');
    const district = formData.get('district');
    const village = formData.get('village');
    const description = formData.get('description');
    const kurir = formData.get('kurir');
    const paket = formData.get('paket');
    const buyway = formData.get('buyway');

    const data = {
      amount1,
      amount2,
      name,
      telp,
      email,
      address,
      provinsi,
      district,
      village,
      description,
      kurir,
      paket,
      buyway,
    };
    console.log(data);

    if (data.buyway == 'transfer') {
      return redirect(`/checkout/transfer`);
    } else if (data.buyway == 'cod') {
      return redirect(`/checkout/cod`);
    }
  }

  return null;
};

function Spinner1() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <HStack maxW="150px">
      <Button {...dec}>-</Button>
      <Input
        minW={'40px'}
        bgColor={'#fcfcfc'}
        {...input}
        value={input.value}
        name="amount1"
      />
      <Button {...inc}>+</Button>
    </HStack>
  );
}

function Spinner2() {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 0,
      min: 0,
    });

  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();
  return (
    <HStack maxW="150px">
      <Button {...dec}>-</Button>
      <Input
        minW={'40px'}
        bgColor={'#fcfcfc'}
        {...input}
        value={input.value}
        name="amount2"
      />
      <Button {...inc}>+</Button>
    </HStack>
  );
}

const data = [{ name: 'Natural Hair Powder', code: 'Rp140', total: 'Rp140' }];

export default function Checkout() {
  return (
    <>
      <Container>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          m={3}
          p={3}
          bgColor={'#dcdcdc'}
        >
          <Form method="post">
            <Box>
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr fontWeight={'bold'}>
                      <Th width={'80%'}>Pilihan Variasi</Th>
                      <Th>Jumlah</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>1 pcs Natural Hair Powder</Td>
                      <Td>
                        <Spinner1 />
                      </Td>
                    </Tr>
                    <Tr>
                      <Td>2 pcs Natural Hair Powder</Td>
                      <Td>
                        <Spinner2 />
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box display={'flex'} flexDir={'column'} gap={3}>
              <Box>
                <Text fontWeight={['bold', 'normal', 'bold', 'normal']}>
                  Data Penerima
                </Text>
                <Box display={'flex'} flexDirection={'column'} gap={3}>
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Nama Anda"
                    name="username"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="number"
                    placeholder="No. WhatsApp Anda"
                    name="no-telp"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="email"
                    placeholder="Email Anda"
                    name="email"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Alamat Lengkap Anda"
                    name="address"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Pilih Provinsi"
                    name="provinsi"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Pilih Kota/Kabupaten"
                    name="district"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Pilih Kecamatan"
                    name="village"
                    required
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Masukkan Cacatan Pemesanan"
                    name="description"
                  />
                </Box>
              </Box>
              <Box>
                <Text fontWeight={'bold'}>Pengiriman</Text>
                <Grid templateColumns={'repeat(4, 1fr)'} gap={4}>
                  <GridItem colSpan={2}>
                    <Select name="kurir" bgColor={'#fcfcfc'} required>
                      <option value="" hidden>
                        Pilih Kurir
                      </option>
                      <option value="option1">JNT</option>
                      <option value="option2">JNE</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Select name="paket" bgColor={'#fcfcfc'} required>
                      <option value="" hidden>
                        Pilih Paket
                      </option>
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </GridItem>
                </Grid>
              </Box>
              <Box>
                <Text fontWeight={'bold'}>Metode Pembayaran</Text>
                <RadioGroup
                  name="buyway"
                  bgColor={'#fcfcfc'}
                  p={3}
                  defaultValue="transfer"
                >
                  <Stack gap={2}>
                    <Radio value="transfer">Bank Transfer</Radio>
                    <Radio value="cod">COD (Bayar Ditempat)</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              {data.map((i, o) => (
                <Box key={o} bgColor={'#fcfcfc'} p={3}>
                  <Text color={'gray'} as="ins">
                    RINCIAN PESANAN
                  </Text>
                  <Text color={'gray'}>{i.name}</Text>
                  <Box fontWeight={'bold'}>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      borderBottom={'1px'}
                    >
                      <Text>Kode Unik</Text>
                      <Text>{i.code}</Text>
                    </Box>
                    <Box display={'flex'} justifyContent={'space-between'}>
                      <Text>Total</Text>
                      <Text>{i.total}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
              <Box>
                <Button bgColor={'GrayText'} w={'100%'} type="submit">
                  Beli Sekarang
                </Button>
              </Box>
            </Box>
          </Form>
        </Box>
      </Container>
    </>
  );
}
