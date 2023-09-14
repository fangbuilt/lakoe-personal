import {
  Box,
  Button,
  Flex,
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
import { Form, useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import CheckoutDescription from '../components/checkoutDescription';
import {
  createCheckout,
  getCheckoutDetail,
} from '../modules/checkout/checkout.service';
import input from '../utils/dataFake.json';

export async function loader({ params }: ActionArgs) {
  const id = params;
  console.log('id:', id);
  return getCheckoutDetail(id);
}

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const name = formData.get('username') as string;
    const telp = formData.get('no-telp') as string;
    const email = formData.get('email') as string;
    const address = formData.get('address') as string;
    const province = formData.get('province') as string;
    const district = formData.get('district') as string;
    const village = formData.get('village') as string;
    const description = formData.get('description') as string;
    const courier = formData.get('courier') as string;
    // const buyway = formData.get("buyway") as string;
    // const voucher = formData.get("voucher") as string;

    const price = +(formData.get('price') as string);
    const storeId = formData.get('storeId') as string;
    const userId = formData.get('userId') as string;
    const productId = formData.get('productId') as string;
    const payment = formData.get('payment') as string;
    const count = +(formData.get('calculation') as string);
    const postalCode = formData.get('postalCode') as string;
    const variantOptionId = formData.get('variantOptionId') as string;

    const invoice = {
      price: price,
      discount: 0,
      status: 'UNPAID',
      receiverLongitude: '',
      receiverLatitude: '',
      receiverDistrict: address,
      receiverPhone: telp,
      receiverAddress: village + ' ' + district + ' ' + province,
      receiverName: name,
      receiverEmail: email,
      receiverPostalCode: postalCode,
      receiverAddressNote: description,
      invoiceNumber: '',
      waybill: '',
      mootaTransactionId: '',
      courierId: courier,
      userId: userId,
    };

    const cart = {
      price: price,
      discount: 0,
      userId: userId,
      storeId: storeId,
    };

    const cartItem = {
      qty: count,
      price: price,
      variantOptionId: variantOptionId,
      userId: userId,
      productId: productId,
    };

    const invoiceHistory = {
      status: 'UNPAID',
    };

    const getPayment = {
      bank: payment,
      amount: price,
      status: 'UNPAID',
      userId: userId,
    };
    console.log('price', count);

    const data = { invoice, cart, cartItem, invoiceHistory, getPayment };

    await createCheckout(data);
  }
  return redirect(`/checkout/transfer`);
};

export default function Checkout() {
  const item = useLoaderData<typeof loader>();
  const { id, slug, store } = useParams();
  console.log('item:', id);
  console.log('item slug:', slug);
  console.log('item store:', store);

  const [count, setCount] = useState<number>(1);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleChange = (e: any) => {
    setCount(e.target.value);
  };

  return (
    <>
      <CheckoutDescription />
      <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
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
                      <Th minW={'180px'}>Jumlah</Th>
                      <Th>Harga</Th>
                      <Th>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td display={'flex'} gap={3} alignItems={'center'}>
                        <Image
                          boxSize={'10'}
                          borderRadius={'10%'}
                          src={item?.attachments[0].url}
                          alt=""
                        />
                        <Text>{item?.name}</Text>
                      </Td>
                      <Td>
                        <Flex alignItems="center">
                          <Button onClick={handleDecrement}>-</Button>
                          <Input
                            type="number"
                            value={count}
                            onChange={handleChange}
                            name="calculation"
                          />
                          <Button onClick={handleIncrement}>+</Button>
                        </Flex>
                        {/* <Counter /> */}
                      </Td>
                      <Td>
                        {
                          item?.variants[0].variantOptions[0]
                            .variantOptionValues[0].price as number
                        }
                      </Td>
                      <Td>
                        {(item?.variants[0].variantOptions[0]
                          .variantOptionValues[0].price as number) * count}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box>
              <Input
                type="hidden"
                name="price"
                value={
                  item?.variants[0].variantOptions[0].variantOptionValues[0]
                    .price
                }
              />
              <Input type="hidden" name="storeId" value={item?.storeId} />
              <Input type="hidden" name="productId" value={item?.id} />
              <Input
                type="hidden"
                name="variantOptionId"
                value={item?.variants[0].variantOptions[0].id}
              />
              <Input
                type="hidden"
                name="userId"
                value={item?.store?.users[0].id}
              />
            </Box>
            <Box display={'flex'} flexDir={'column'} gap={3}>
              <Box>
                <Text fontWeight={['bold', 'normal', 'bold', 'normal']}>
                  Data Penerima
                </Text>
                <Box display={'flex'} flexDirection={'column'} gap={3}>
                  {input.map((i, o) => (
                    <Input
                      key={o}
                      bgColor={'#fcfcfc'}
                      type={i.type}
                      placeholder={i.placeholder}
                      name={i.name}
                      required
                    />
                  ))}
                </Box>
              </Box>
              <Box>
                <Text fontWeight={'bold'}>Pengiriman</Text>
                <Box display={'flex'} gap={3}>
                  <Box width={'50%'}>
                    <Select name="courier" bgColor={'#fcfcfc'}>
                      <option value="" hidden>
                        Pilih Kurir
                      </option>
                      <option value="1">Grab</option>
                      <option value="2">JNE</option>
                      <option value="3">TIKI</option>
                      <option value="4">ShoopeeExpress</option>
                      <option value="5">TokopediaExpress</option>
                    </Select>
                  </Box>
                  <Box w={'50%'}>
                    <Select name="getPackage" bgColor={'#fcfcfc'}>
                      <option value="" hidden>
                        Pilih Paket
                      </option>
                      <option value="1">Grab</option>
                      <option value="2">JNE</option>
                      <option value="3">TIKI</option>
                      <option value="4">ShoopeeExpress</option>
                      <option value="5">TokopediaExpress</option>
                    </Select>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Text fontWeight={'bold'}>Metode Pembayaran</Text>
                <RadioGroup name="payment" bgColor={'#fcfcfc'} p={3}>
                  <Stack gap={2}>
                    <Radio value="BCA">
                      <Flex gap={2} alignItems={'center'}>
                        <Image
                          w={'50px'}
                          src="https://www.bca.co.id/-/media/Feature/Card/List-Card/Tentang-BCA/Brand-Assets/Logo-BCA/Logo-BCA_Biru.png"
                          alt="bca icon"
                        />
                        BCA
                      </Flex>
                    </Radio>
                    <Radio value="BRI">
                      <Flex gap={2} alignItems={'center'}>
                        <Image
                          w={'50px'}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/BRI_2020.svg/2560px-BRI_2020.svg.png"
                          alt="bca icon"
                        />
                        BRI
                      </Flex>
                    </Radio>
                    <Radio value="Mandiri">
                      <Flex gap={2} alignItems={'center'}>
                        <Image
                          w={'50px'}
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Bank_Mandiri_logo_2016.svg/1200px-Bank_Mandiri_logo_2016.svg.png"
                          alt=""
                        />
                        Mandiri
                      </Flex>
                    </Radio>
                    <Radio value="BNI">
                      <Flex gap={2} alignItems={'center'}>
                        <Image
                          w={'50px'}
                          src="https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png"
                          alt=""
                        />
                        BNI
                      </Flex>
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box bgColor={'#fcfcfc'} p={3}>
                <Text color={'gray'} as="ins">
                  RINCIAN PESANAN
                </Text>
                <Text color={'gray'}>{item?.name}</Text>
                <Text
                  w={'50%'}
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  whiteSpace={'nowrap'}
                  color={'gray'}
                >
                  {item?.description}
                </Text>
                <Box fontWeight={'bold'}>
                  <Box
                    display={'flex'}
                    justifyContent={'space-between'}
                    borderBottom={'1px'}
                  >
                    <Text>Kode Unik</Text>
                    <Text>{'none'}</Text>
                  </Box>
                  <Box display={'flex'} justifyContent={'space-between'}>
                    <Text>Total</Text>
                    <Text>
                      {(item?.variants[0].variantOptions[0]
                        .variantOptionValues[0].price as number) * count}
                    </Text>
                  </Box>
                </Box>
              </Box>
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
// };
