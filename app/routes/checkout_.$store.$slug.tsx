import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { type ActionArgs } from '@remix-run/node';
import { Form, useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import CheckoutCourier from '~/modules/checkout/component/checkoutCourier';
import CheckoutDescription from '../components/checkoutDescription';
import {
  createCheckout,
  getCheckoutDetail,
} from '../modules/checkout/checkout.service';
import input from '../utils/dataFake.json';

export async function loader({ params }: ActionArgs) {
  const data = params;
  console.log('data:', data);
  return getCheckoutDetail(data);
}

export const action = async ({ request }: ActionArgs) => {
  if (request.method.toLowerCase() === 'post') {
    const formData = await request.formData();

    const name = formData.get('username') as string;
    const telp = formData.get('no-telp') as string;
    const email = formData.get('email') as string;
    // const address = formData.get("address") as string;
    const province = formData.get('province') as string;
    const district = formData.get('district') as string;
    const village = formData.get('village') as string;
    const description = formData.get('description') as string;
    const courier = formData.get('courier') as string;
    const courierService = +(formData.get('courierService') as string);
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
    const totalPrice = +(formData.get('totalPrice') as string);
    const totalPriceUnique = +(formData.get('totalPriceUnique') as string);
    const variantOptionValueId = formData.get('valueId') as string;
    const stock = +(formData.get('stock') as string);

    const invoice = {
      price: totalPriceUnique + courierService,
      discount: 0,
      status: 'UNPAID',
      receiverLongitude: '',
      receiverLatitude: '',
      receiverDistrict: district,
      receiverPhone: telp,
      receiverAddress: village + ' ' + district + ' ' + province,
      receiverName: name,
      receiverEmail: email,
      receiverPostalCode: postalCode,
      receiverAddressNote: description,
      invoiceNumber: '',
      waybill: '',
      mootaTransactionId: '',
      userId: userId,
    };

    const cart = {
      price: totalPrice,
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
      amount: totalPriceUnique + courierService,
      status: 'UNPAID',
      userId: userId,
    };

    const getCourier = {
      availableForCashOnDelivery: false,
      availableForProofOfDelivery: false,
      availableForInstantWaybillId: false,
      courierType: courier,
      courierInsurance: '',
      courierName: courier,
      courierCode: courier,
      courierServiceName: '',
      courierServiceCode: '',
      tier: '',
      description: '',
      serviceType: '',
      shippingType: 'parcel',
      shipmentDurationRange: '',
      shipmentDurationUnit: '',
      price: 1,
      orderId: '',
      trackingId: '',
      deliveryDate: '',
      deliveryTime: '',
    };

    const update = {
      valueId: variantOptionValueId,
      stock: stock,
    };

    console.log('update', update);

    const data = {
      invoice,
      cart,
      cartItem,
      invoiceHistory,
      getPayment,
      update,
      courierService,
      getCourier,
    };

    console.log(data);
    console.log('id nya :', variantOptionValueId);
    console.log('stock nya :', stock);

    return await createCheckout(data);
  }
  return null;
};

export default function Checkout() {
  const item = useLoaderData<typeof loader>();
  const { slug, store } = useParams();
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

  const unique = Math.floor(Math.random() * (200 - 100)) + 100;

  return (
    <>
      <CheckoutDescription
        image={item?.attachments[0].url}
        name={item?.name}
        description={item?.description}
      />
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
                        <Box>
                          <Text>{item?.name}</Text>
                          <Text color={'gray.600'}>
                            {(item?.variants[0].variantOptions[0]
                              .variantOptionValues[0].stock as number) - count}
                            pcs
                          </Text>
                          <Input
                            type="hidden"
                            name="stock"
                            value={
                              (item?.variants[0].variantOptions[0]
                                .variantOptionValues[0].stock as number) - count
                            }
                          />
                        </Box>
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
                      </Td>
                      <Td>
                        {item?.variants[0].variantOptions[0].variantOptionValues[0].price.toLocaleString(
                          'id-ID'
                        )}
                      </Td>
                      <Td>
                        {(
                          (item?.variants[0].variantOptions[0]
                            .variantOptionValues[0].price as number) * count
                        ).toLocaleString('id-ID')}
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
                name="valueId"
                value={
                  item?.variants[0].variantOptions[0].variantOptionValues[0].id
                }
              />
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
                <Box mt={3}>
                  <CheckoutCourier
                    name={item?.name}
                    description={item?.description}
                    unique={unique}
                    total={
                      (item?.variants[0].variantOptions[0]
                        .variantOptionValues[0].price as number) *
                        count +
                      unique
                    }
                    totalPrice={
                      (item?.variants[0].variantOptions[0]
                        .variantOptionValues[0].price as number) * count
                    }
                    totalPriceUnique={
                      (item?.variants[0].variantOptions[0]
                        .variantOptionValues[0].price as number) *
                        count +
                      unique
                    }
                  />
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
