import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridItem,
  Image,
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
} from '@chakra-ui/react';
import { redirect, type ActionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { db } from '~/libs/prisma/db.server';

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    // const amount1 = +(formData.get("amount1") as string);
    // const amount2 = +(formData.get("amount2") as string);
    const name = formData.get('username') as string;
    const telp = formData.get('no-telp') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const provinsi = formData.get('provinsi') as string;
    const district = formData.get('district') as string;
    const village = formData.get('village') as string;
    const description = formData.get('description') as string;
    const kurir = formData.get('kurir') as string;
    const paket = formData.get('paket') as string;
    const buyway = formData.get('buyway') as string;
    const voucher = formData.get('voucher') as string;

    // const data = {
    //   price: 0,
    //   discount: 0,
    //   status: "",
    //   receiverLongitude: "",
    //   receiverLatitude: "",
    //   receiverDistrict: district,
    //   receiverPhone: telp,
    //   receiverAddress: address,
    //   receiverName: name,
    //   invoiceNumber: "",
    //   waybill: "",
    //   cart: 0,
    //   payment: 0,
    //   courier: 0,
    //   user: 0,
    //   invoiveHistories: "",
    //   mootaTransactionId: "",
    // };

    const post = {
      // "Jumlah Barang 1": amount1,
      // "Jumlah Barang 2": amount2,
      'Nama Pembeli': name,
      'No Telp': telp,
      'Email ': email,
      'Alamat ': address,
      'Daerah ': address + ' ' + provinsi + ' ' + district,
      'Provinsi ': provinsi,
      'Kota/Kabupaten': district,
      'Kecamatan ': village,
      'Deskripsi ': description,
      'Voucher ': voucher,
      'Kurir ': kurir,
      'Paket ': paket,
      'Metode Pembayaran': buyway,
    };

    console.log(post);

    // await createPost(data);

    if (buyway == 'transfer') {
      return redirect(`/checkout/transfer`);
    } else if (buyway == 'cod') {
      return redirect(`/checkout/cod`);
    }
  }

  return null;
};

export async function createPost(data: any) {
  return await db.invoice.create({ data: data });
}

const data = [{ name: 'Natural Hair Powder', code: 'Rp140', total: 'Rp140' }];

export async function loader() {
  return await db.product.findUnique({
    where: {
      id: '1',
    },
    include: {
      store: true,
      variants: {
        include: {
          variantOptions: true,
        },
      },
    },
  });
}

export default function Checkout() {
  const item = useLoaderData<typeof loader>();
  return (
    <>
      <Box paddingInline={'10%'}>
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
                <Box>
                  <Text>Produk Dipesan</Text>
                </Box>
                <Table variant="simple">
                  <Thead>
                    <Tr fontWeight={'bold'}>
                      <Th width={'80%'}>Pilihan Variasi</Th>
                      <Th>Harga</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td display={'flex'} gap={3} alignItems={'center'}>
                        <Image
                          boxSize={'10'}
                          borderRadius={'10%'}
                          src={item?.attachments[0]}
                          alt=""
                        />
                        <Text>{item?.name}</Text>
                      </Td>
                      <Td>{item?.variants[0].name}</Td>
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
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="number"
                    placeholder="No. WhatsApp Anda"
                    name="no-telp"
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="email"
                    placeholder="Email Anda"
                    name="email"
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Alamat Lengkap Anda"
                    name="address"
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Pilih Provinsi"
                    name="provinsi"
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Pilih Kota/Kabupaten"
                    name="district"
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Pilih Kecamatan"
                    name="village"
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="text"
                    placeholder="Masukkan Catatan Pemesanan"
                    name="description"
                  />
                </Box>
              </Box>
              <Box>
                <Text fontWeight={'bold'}>Pengiriman</Text>
                <Grid templateColumns={'repeat(4, 1fr)'} gap={4}>
                  <GridItem colSpan={2}>
                    <Select name="kurir" bgColor={'#fcfcfc'}>
                      <option value="" hidden>
                        Pilih Kurir
                      </option>
                      <option value="option1">JNT</option>
                      <option value="option2">JNE</option>
                      <option value="option3">Option 3</option>
                    </Select>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Select name="paket" bgColor={'#fcfcfc'}>
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
                <Text fontWeight={'bold'}>Voucher</Text>
                <Box bgColor={'#fcfcfc'} p={3}>
                  <Box>
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr fontWeight={'bold'}>
                            <Th width={'80%'}>Nama Voucher</Th>
                            <Th>Pilih Voucher</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          <Tr>
                            <Td display={'flex'} gap={3} alignItems={'center'}>
                              <Text>Koin dapat Voucher</Text>
                            </Td>
                            <Td>
                              <Checkbox value={'100.000'} name="voucher">
                                Rp10.000
                              </Checkbox>
                            </Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
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
      </Box>
    </>
  );
}
