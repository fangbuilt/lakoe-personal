import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { redirect, type ActionArgs } from '@remix-run/node';
import { Form, useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import CheckoutCourier from '~/modules/checkout/component/checkoutCourier';
import CheckoutDescription from '../components/checkoutDescription';
import {
  createCheckout,
  getCheckoutDetail,
} from '../modules/checkout/checkout.service';
import input from '../utils/dataFake.json';
import { handleClick } from './productUnpaid4';

export async function loader({ params }: ActionArgs) {
  const data = params;
  const getData = {
    slug: data.slug,
    store: data.store?.replace(/-/g, ' '),
  };
  try {
    const detail = await getCheckoutDetail(getData);
    return detail;
  } catch (error) {
    console.log('error');
    return redirect(`/error-page/${data.store}/${data.slug}`);
  }
}

export const action = async ({ request }: ActionArgs) => {
  try {
    if (request.method.toLowerCase() === 'post') {
      const formData = await request.formData();

      const name = formData.get('username') as string;
      const telp = formData.get('no-telp') as string;
      const email = formData.get('email') as string;
      const province = formData.get('province') as string;
      const district = formData.get('district') as string;
      const village = formData.get('village') as string;
      const description = formData.get('description') as string;
      const courier = formData.get('courier') as string;
      const courierService = +(formData.get('courierService') as string);

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
      const rates = +(formData.get('rates') as string);

      if (!courier) {
        console.log('Please select courier');
        return false;
      } else if (!courierService) {
        console.log('Please select courier service');
        return false;
      } else if (!payment) {
        console.log('Please select payment');
        return false;
      }

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
        courierInsurance: 'false',
        courierName: courier,
        courierCode: courier,
        courierServiceName: 'Instant',
        courierServiceCode: 'Instant',
        tier: 'premium',
        description: '',
        serviceType: '',
        shippingType: 'parcel',
        shipmentDurationRange: '',
        shipmentDurationUnit: '',
        price: rates,
        orderId: 'orderId-test',
        trackingId: '',
        deliveryDate: '',
        deliveryTime: '',
      };

      const updateStock = {
        valueId: variantOptionValueId,
        stock: stock,
      };

      const data = {
        invoice,
        cart,
        cartItem,
        invoiceHistory,
        getPayment,
        updateStock,
        courierService,
        getCourier,
      };

      handleClick(telp, name, email);

      console.log('data : ', data);

      try {
        const create = await createCheckout(data);
        return create;
      } catch (error) {
        console.log('Error : ', error);
        return false;
      } finally {
        console.log('Done');
      }
    }
    return null;
  } catch (error) {
    console.log('Error : ', error);
    return null;
  }
};

export default function Checkout() {
  const data = useLoaderData<typeof loader>();

  const item =
    typeof data === 'object' && 'product' in data ? data.product : null;
  const getUnique = 'unique' in data ? data.unique : null;
  const uniqueNumber = getUnique as number;

  const { slug, store } = useParams();

  const [count, setCount] = useState<number>(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const handleChange = (e: any) => {
    setCount(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState(0);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valueInt = parseInt(value);
    setSelectedOption(valueInt);
  };

  const limit = item?.variants[selectedOption].variantOptions[0]
    .variantOptionValues[0].stock as number;

  if (count < 0) {
    setCount(0);
  } else if (count > limit) {
    setCount(limit);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    onOpen();
    if (count === 0) {
      console.log('Please select quantity');
      return alert('Pilih berapa banyak produk yang ingin dibeli');
    }
  };

  return (
    <>
      <CheckoutDescription
        image={item?.attachments[0].url}
        name={item?.name}
        description={item?.description}
      />
      <Box display={'flex'} flexDir={'column'} alignItems={'center'}>
        <Box display={'none'}>
          <Text>{store}</Text>
          <Text>{slug}</Text>
        </Box>
        <Box>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent p={5}>
              <ModalHeader fontWeight={'bold'} textAlign={'center'}>
                Currently placing a new order
              </ModalHeader>
              {/* <ModalCloseButton /> */}
              <ModalBody>
                <Box
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  mb={5}
                >
                  <Spinner
                    w={20}
                    h={20}
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>
        <Box
          display={'flex'}
          flexDirection={'column'}
          gap={3}
          m={3}
          p={3}
          bgColor={'#dcdcdc'}
          w={'90%'}
        >
          <Form method="post">
            <Box>
              <TableContainer>
                <Box>
                  <div id="message"></div>
                  {/* <Text id="message"></Text> */}
                  <Text>Produk Dipesan</Text>
                </Box>
                <Table variant="simple">
                  <Thead>
                    <Tr fontWeight={'bold'}>
                      <Th width={'40%'}>Produk</Th>
                      <Th width={'40%'}>Variasi</Th>
                      <Th minW={'180px'}>Jumlah</Th>
                      <Th>Harga</Th>
                      <Th>Total</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td display={'flex'} gap={3} alignItems={'center'}>
                        <Image
                          objectFit={'cover'}
                          boxSize={'10'}
                          borderRadius={'10%'}
                          src={item?.attachments[0].url}
                          alt=""
                        />
                        <Box>
                          <Text>{item?.name}</Text>
                          <Text color={'gray.600'}>
                            {(item?.variants[selectedOption].variantOptions[0]
                              .variantOptionValues[0].stock as number) - count}
                            pcs
                          </Text>
                          <Input
                            type="hidden"
                            name="stock"
                            value={
                              (item?.variants[selectedOption].variantOptions[0]
                                .variantOptionValues[0].stock as number) - count
                            }
                            readOnly
                          />
                        </Box>
                      </Td>
                      <Td>
                        <Box display={'flex'} flexWrap={'wrap'} gap={2}>
                          {item?.variants.map((i, o) => (
                            <Box key={o}>
                              <Input
                                type="radio"
                                id={i.id}
                                value={o}
                                defaultChecked={selectedOption === o}
                                onChange={handleRadioChange}
                                style={{ display: 'none' }}
                              />
                              <label
                                htmlFor={i.id}
                                style={{
                                  border: '1px solid',
                                  borderRadius: '5px',
                                  backgroundColor:
                                    selectedOption === o ? 'white' : '#dcdcdc',
                                  borderColor:
                                    selectedOption === o ? '#0091f7' : '#ccc',
                                  padding: '5px 10px',
                                  cursor: 'pointer',
                                }}
                              >
                                {i.name}
                              </label>
                            </Box>
                          ))}
                        </Box>
                      </Td>
                      <Td>
                        <Flex alignItems="center">
                          <Button onClick={handleDecrement}>-</Button>
                          <Input
                            minW={'50px'}
                            type="number"
                            value={count}
                            onChange={handleChange}
                            name="calculation"
                          />
                          <Button onClick={handleIncrement}>+</Button>
                        </Flex>
                      </Td>
                      <Td>
                        {item?.variants[
                          selectedOption
                        ].variantOptions[0].variantOptionValues[0].price.toLocaleString(
                          'id-ID'
                        )}
                      </Td>
                      <Td>
                        {(
                          (item?.variants[selectedOption].variantOptions[0]
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
                name="option"
                value={selectedOption}
                readOnly
                required
              />
              <Input
                type="hidden"
                name="price"
                readOnly
                value={
                  item?.variants[selectedOption].variantOptions[0]
                    .variantOptionValues[0].price
                }
              />
              <Input
                type="hidden"
                name="storeId"
                value={item?.storeId}
                readOnly
              />
              <Input type="hidden" name="productId" value={item?.id} readOnly />
              <Input
                type="hidden"
                name="valueId"
                readOnly
                value={
                  item?.variants[selectedOption].variantOptions[0]
                    .variantOptionValues[0].id
                }
              />
              <Input
                type="hidden"
                name="variantOptionId"
                readOnly
                value={item?.variants[selectedOption].variantOptions[0].id}
              />
              <Input
                type="hidden"
                name="userId"
                readOnly
                value={item?.store?.users[selectedOption].id}
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
                    unique={getUnique}
                    total={
                      (item?.variants[selectedOption].variantOptions[0]
                        .variantOptionValues[0].price as number) *
                        count +
                      uniqueNumber
                    }
                    totalPrice={
                      (item?.variants[selectedOption].variantOptions[0]
                        .variantOptionValues[0].price as number) * count
                    }
                    totalPriceUnique={
                      (item?.variants[selectedOption].variantOptions[0]
                        .variantOptionValues[0].price as number) *
                        count +
                      uniqueNumber
                    }
                  />
                </Box>
              </Box>
              <Box>
                <Button
                  onClick={handleSubmit}
                  bgColor={'GrayText'}
                  w={'100%'}
                  type="submit"
                >
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
