import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Modal,
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
  useDisclosure,
} from '@chakra-ui/react';
import { redirect, type ActionArgs } from '@remix-run/node';
import { Form, useLoaderData, useParams } from '@remix-run/react';
import { useState } from 'react';
import {
  InputHidden,
  ModalCheckout,
} from '~/modules/checkout/component/checkoutForm';
import {
  useCounter,
  useCourier,
  useDistrict,
  useFormCheckout,
  useVariant,
} from '~/modules/checkout/component/useCheckout';
import CheckoutDescription from '../components/checkoutDescription';
import {
  createCheckout,
  getCheckoutDetail,
} from '../modules/checkout/checkout.service';
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
      const telp = formData.get('notelp') as string;
      const email = formData.get('email') as string;
      const province = formData.get('province') as string;
      const district = formData.get('district') as string;
      const village = formData.get('village') as string;
      const getDescription = formData.get('description') as string;
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

      let description = getDescription;
      if (!getDescription) {
        description = '';
      }

      if (!payment) {
        console.log('Please fill all fields');
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

      // await CreateNewCheckout(all);

      console.log('data : ', data);

      try {
        // const create = await createCheckout(data);
        handleClick(telp, name, email);
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

  const { selectedOption, handleRadioChange } = useVariant();

  const limit = item?.variants[selectedOption].variantOptions[0]
    .variantOptionValues[0].stock as number;

  const { count, handleIncrement, handleDecrement, handleChange } =
    useCounter(limit);

  const {
    coment,
    provinsiOption,
    selectedProvince,
    kabupatenOption,
    selectedKabupaten,
    kecamatanOption,
    selectedKecamatan,
    handleProvinceChange,
    handleKabupatenChange,
    handleKecamatanChange,
  } = useDistrict();

  // from UseCheckout
  const {
    postalCode,
    handleRatesChange,
    rates,
    courierServiceSelected,
    dataCourier,
    courierService,
    dataRates,
    setDataRates,
    handleChangeCourier,
  } = useCourier();

  const [bankMetode, setBankMetode] = useState('');
  const handleBankMetodeChange = (event: any) => {
    setBankMetode(event);
  };
  console.log('bankMetode : ', bankMetode);

  const { nameFor, form, handleChangeForm } = useFormCheckout();

  console.log('dataRates : ', dataRates.postalCode);

  let comment = 'Currently placing a new order';
  let spinner = 'none';

  if (count === 0) {
    comment = 'Pilih berapa banyak produk yang ingin dibeli';
  } else if (nameFor !== '') {
    comment = nameFor;
  } else if (coment !== '') {
    comment = coment;
  } else if (dataRates.postalCode === '') {
    comment = 'Harap masukkan kode pos';
  } else if (courierServiceSelected === '') {
    comment = 'Harap pilih layanan kurir';
  } else if (rates === '') {
    comment = 'Harap pilih kurir';
  } else if (bankMetode === '') {
    comment = 'Harap pilih metode pembayaran';
  } else {
    spinner = 'block';
  }
  console.log('form : ', form);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSubmit = () => {
    if (spinner === 'none') {
      return onOpen();
    } else {
      onOpen();
    }
  };

  const rate = parseInt(rates);
  const isTotal = item?.variants[selectedOption].variantOptions[0]
    .variantOptionValues[0].price as number;
  const total = isTotal * count + uniqueNumber;
  let totalValue = 0;
  if (!rate) {
    totalValue = total;
  } else {
    totalValue = total + rate;
  }

  const valueTotal = totalValue.toLocaleString('id-ID');
  const ValueAfter = total.toLocaleString('id-ID');

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
            <ModalCheckout text={comment} displaySpinner={spinner}>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalCheckout>
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
            <InputHidden
              selectedOption={selectedOption}
              price={
                item?.variants[selectedOption].variantOptions[0]
                  .variantOptionValues[0].price
              }
              storeId={item?.storeId}
              productId={item?.id}
              valueId={
                item?.variants[selectedOption].variantOptions[0]
                  .variantOptionValues[0].id
              }
              variantOptionId={
                item?.variants[selectedOption].variantOptions[0].id
              }
              userId={item?.store?.users[selectedOption].id}
            />
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
                    onChange={handleChangeForm}
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="number"
                    placeholder="Nomor Telepon"
                    name="notelp"
                    onChange={handleChangeForm}
                  />
                  <Input
                    bgColor={'#fcfcfc'}
                    type="email"
                    placeholder="Email Anda"
                    name="email"
                    onChange={handleChangeForm}
                  />
                </Box>
                <Box mt={3}>
                  {/* <CheckoutCourierBuyer
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
                  /> */}
                  <Box>
                    <Box display={'flex'} flexDirection={'column'} gap={3}>
                      <Select
                        bgColor={'#fcfcfc'}
                        name="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                      >
                        <option hidden>Pilih Provinsi</option>
                        {provinsiOption.map((option) => (
                          <option
                            key={option.id}
                            value={option.id + ',' + option.name}
                          >
                            {option.name}
                          </option>
                        ))}
                      </Select>

                      <Select
                        bgColor={'#fcfcfc'}
                        name="district"
                        value={selectedKabupaten}
                        onChange={handleKabupatenChange}
                      >
                        <option hidden>Pilih Kabupaten</option>
                        {kabupatenOption.map((kabupaten) => (
                          <option
                            key={kabupaten.id}
                            value={kabupaten.id + ',' + kabupaten.name}
                          >
                            {kabupaten.name}
                          </option>
                        ))}
                      </Select>

                      <Select
                        bgColor={'#fcfcfc'}
                        name="village"
                        value={selectedKecamatan}
                        onChange={handleKecamatanChange}
                      >
                        <option hidden>Pilih Kecamatan</option>
                        {kecamatanOption.map((kecamatan) => (
                          <option
                            key={kecamatan.id}
                            value={kecamatan.id + ',' + kecamatan.name}
                          >
                            {kecamatan.name}
                          </option>
                        ))}
                      </Select>

                      <Input
                        bgColor={'#fcfcfc'}
                        name="postalCode"
                        placeholder="Kode Pos"
                        value={postalCode}
                        onChange={(e) =>
                          setDataRates({
                            ...dataRates,
                            postalCode: e.target.value,
                          })
                        }
                      />

                      <Input
                        bgColor={'#fcfcfc'}
                        type="text"
                        name="description"
                        placeholder="Masukkan Catatan Pemesanan"
                      />

                      <Box>
                        <Text fontWeight={'bold'}>Pengiriman</Text>
                      </Box>
                      <Box display={'flex'} gap={3}>
                        <Box width={'50%'}>
                          <Select
                            bgColor={'#fcfcfc'}
                            name="courier"
                            onChange={(e) =>
                              handleChangeCourier(e.target.value)
                            }
                          >
                            <option hidden>Pilih Kurir</option>
                            {dataCourier.map((data, index) => (
                              <option value={data} key={index}>
                                {data}
                              </option>
                            ))}
                          </Select>
                        </Box>
                        <Box width={'50%'}>
                          <Select
                            bgColor={'#fcfcfc'}
                            name="courierService"
                            onChange={handleRatesChange}
                          >
                            <option hidden>Pilih Tipe Pengiriman</option>
                            {courierService.map((data, index) => (
                              <option value={data.price} key={index}>
                                {data.duration} {data.service_type} {data.price}
                              </option>
                            ))}
                          </Select>
                        </Box>
                      </Box>
                      <Text>Harga Ongkir : {rates} </Text>
                      <Box>
                        <Box>
                          <Text fontWeight={'bold'}>Metode Pembayaran</Text>
                          <RadioGroup
                            name="payment"
                            bgColor={'#fcfcfc'}
                            p={3}
                            id="payment"
                            onChange={handleBankMetodeChange}
                          >
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
                              <Text>{getUnique}</Text>
                            </Box>
                            <Box
                              display={'flex'}
                              justifyContent={'space-between'}
                            >
                              <Text>Total</Text>
                              <Text>{valueTotal ?? ValueAfter}</Text>
                              <Input
                                type="hidden"
                                name="totalPrice"
                                value={
                                  (item?.variants[selectedOption]
                                    .variantOptions[0].variantOptionValues[0]
                                    .price as number) * count
                                }
                                readOnly
                              />
                              <Input
                                type="hidden"
                                name="totalPriceUnique"
                                value={
                                  (item?.variants[selectedOption]
                                    .variantOptions[0].variantOptionValues[0]
                                    .price as number) *
                                    count +
                                  uniqueNumber
                                }
                                readOnly
                              />
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {/* <Box>
                        <Button
                          display={"none"}
                          onChange={(e) => handlePostalCodeChange(e)}
                        ></Button>
                      </Box>
                      <Input
                        hidden
                        name="selectedProvinceName"
                        placeholder="Phone Number"
                        value={selectedProvinceName}
                        readOnly
                      />
                      <Input
                        hidden
                        name="selectedKabupatenName"
                        placeholder="Phone Number"
                        value={selectedKabupatenName}
                        readOnly
                      />
                      <Input
                        hidden
                        name="selectedKecamatanName"
                        placeholder="Phone Number"
                        value={selectedKecamatanName}
                        readOnly
                      /> */}
                    </Box>
                  </Box>
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
