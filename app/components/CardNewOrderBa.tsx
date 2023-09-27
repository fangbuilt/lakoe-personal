/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Link, useLoaderData, useSubmit } from '@remix-run/react';
import { useState } from 'react';
import useSearchFilter from '~/hooks/useSearchOrder';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import type { loader } from '~/routes/order';
import { db } from '~/libs/prisma/db.server';
import { ActionArgs } from '@remix-run/node';

export function formatCurrency(price: number): string {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedAmount;
}

export default function CardNewOrderBa() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { filteredOrders } = useSearchFilter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardProduct = useLoaderData<typeof loader>();
  const [selectedProps, setSelectedProps] = useState<IOrderDetailInvoice>();
  const submit = useSubmit();

  const props = cardProduct.dataInvoice;

  async function updateInvoiceAndHistoryStatusReadyToShip() {
    try {
      if (!selectedProps?.id) {
        return console.log('Order ID not found!');
      }

      submit(
        {
          id: selectedProps.id,
          status: 'READY_TO_SHIP',
          actionType: 'updateInvoiceAndHistoryStatusReadyToShip',
        },
        { method: 'POST' }
      );
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
      throw error;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleBalanceNotif = async () => {
    try {
      const mailerBaseUrl = 'https://connect.mailerlite.com';
      const mailerEndPoint = '/api/subscribers';
      const mailerApiKey =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2E4ZjZkNTMxMDdkY2M1MjZjM2M5YTQxY2JhMjg0ZjJlOTc5NmFjOTA2MjVkMzRjN2I5NTVmNDY1ODlkZjcxOGM5NzY5ZmYyMzU5OTcxZTkiLCJpYXQiOjE2OTQxNTU1NDQuMTI1MzUyLCJuYmYiOjE2OTQxNTU1NDQuMTI1MzU0LCJleHAiOjQ4NDk4MjkxNDQuMTIwNDQsInN1YiI6IjYxNDY4NSIsInNjb3BlcyI6W119.KgsXIIo-rqViucL5U0QTHaG-Nhp0YJn0c752CSW1taUIVgfP0Dyk-vL-mHEGCLWl4CROGPwtzGakauaIGV1A-ijvg_16vEz04u8xKRzzuP4F9Hza78RnhTXjewo6oEiB4_E3WwFU6qalQmzoNaSzmaBI4zi6HZOO29uEHtZRswRfmi5g1XmDyqo2SmaL6S3nTU7xMoHaBlvY7UnanzqdpX0nr-nxS-05ADZRlo1a3YDQBihDFLzrhN8xgtXipU5O7nz18-Ivpj2TNjaMNk85zZukLYPxF1lVXrbNFWKVWJKMk9gthqMWsPDQTg7GexZSE-0uzZL8CO1azw_hCdJUJQYM3KYw1pb6PUm4YSO-Br4etsClpICaivipa5EGSOKF3wvAhyHa12ZIZuJcBadQPyAaiDi8a0s1O6UbLMBa_45oDDfeNQsEpXg9i5hkAe7H0DEdgM69JMh0zmu4Vi8s3f_fmz0pfGjXfKVT6g0KHx0K6AYhN714R2x6FOB-au4QrPlE_UdvIOO959uozJ4CHHiBKClWcTLRELWwCPmo6y5s-K8_s7h1czfV2MVx5mfihABiLyxCv3y6EwxgTi6gjKiN4NcCMoGnxt0dwPos67QQ-gRn2SdQoN0rsrKGuZltLOBza1cnqoHAZAFHiSrJq332VNoJhNuXN-3MoXw1LCY'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const mailerData = {
        email: 'aderino.2232510384+69@gmail.com',
        fields: {
          company: 'ADD MORE BALANCE', //company berperan sebagai "title" dalam mailerlite
          last_name:
            "you need to add more balance to your platform system so that your sellers can keep sending packages to their customer without being delayed just because you're lack of money. do what you gotta do", //last_name berperan sebagai isian pesan ("message") dalam mailerlite
        },
        groups: ['98713000939095999'],
      };

      const mailerRequest = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${mailerApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mailerData),
      };

      const response = await fetch(
        `${mailerBaseUrl}${mailerEndPoint}`,
        mailerRequest
      );
      const responseData = await response.json();
      console.log('Data Email :', responseData);
      alert('System sedang terkendala, cobalah beberapa saat lagi');
    } catch (error) {
      alert(error);
    }
  };

  const systembalance = 1231029387; //saldo LAKOE

  const afterpacking = () => {
    if (systembalance > 50000) {
      handleOrderCourier();
      updateInvoiceAndHistoryStatusReadyToShip();
    } else {
      handleBalanceNotif();
    }
  };

  const handleOrderCourier = async () => {
    try {
      const baseUrl = 'https://api.biteship.com';
      const endpoint = '/v1/orders';
      const apiKey =
        'biteship_test.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUmlub1B1amEtTEFLT0UiLCJ1c2VySWQiOiI2NTA4MDJiOTA5ZWRjNTViMThjNGQxNDMiLCJpYXQiOjE2OTUxOTkyOTZ9.yNL64MzGSESlk-zln4iv0-yz9Nv3osEmt2_sVqOJ2xI'; //hapus dan gunakan process.env.blablabla sebelum publish (credentials bukan konsumsi public)

      const dataforBiteShip = {
        // shipper_contact_name: props[0].cart?.store?.users[0].name,
        shipper_contact_name: selectedProps?.cart?.store?.users[0].name,
        shipper_contact_phone: selectedProps?.cart?.store?.users[0].phone,
        shipper_contact_email: selectedProps?.cart?.store?.users[0].email,
        shipper_organization: selectedProps?.cart?.store.name,
        origin_contact_name: selectedProps?.cart?.store?.users[0].name,
        origin_contact_phone: selectedProps?.cart?.store?.users[0].phone,
        origin_address: selectedProps?.cart?.store?.locations[0].address,
        origin_note: selectedProps?.cart?.store?.locations[0].addressNote,

        origin_coordinate: {
          latitude: -6.2253114,
          longitude: 106.7993735,
        },
        origin_postal_code: selectedProps?.cart?.store?.locations[0].postalCode,
        destination_contact_name: selectedProps?.receiverName,
        destination_contact_phone: selectedProps?.receiverPhone,
        destination_contact_email: selectedProps?.receiverEmail,
        destination_address: selectedProps?.receiverAddress,
        destination_postal_code: selectedProps?.receiverPostalCode,
        destination_note: selectedProps?.receiverAddressNote,
        destination_cash_proof_of_delivery: true,
        destination_coordinate: {
          latitude: -6.28927,
          longitude: 106.77492000000007,
        },
        courier_company: 'grab',

        courier_type: 'instant',
        courier_insurance: true,
        delivery_type: 'later',
        delivery_date: '2024-09-24',
        delivery_time: '12:00',
        order_note: 'satukan semua pesanan kedalam satu packaging',
        metadata: {},
        items: [
          {
            id: 1,
            name: selectedProps?.cart.cartItems[0].product.name,
            image: '',
            description: selectedProps?.cart.cartItems[0].product.description,
            value: selectedProps?.price,
            quantity: selectedProps?.cart.cartItems[0].qty,
            height: 10,
            length: 20,
            weight: 0.5,
            width: 15,
          },
        ],
      };

      // const dataforBiteShip = {
      //   shipper_contact_name: props.map((a) =>
      //     a.cart?.store?.users.map((cok) => cok.name)
      //   ),
      //   shipper_contact_phone: props.map((a) =>
      //     a.cart?.store?.users.map((cok) => cok.phone)
      //   ),
      //   shipper_contact_email: props.map((a) =>
      //     a.cart?.store?.users.map((cok) => cok.email)
      //   ),
      //   shipper_organization: props.map((a) => a.cart?.store?.name),
      //   origin_contact_name: props.map((a) =>
      //     a.cart?.store?.users.map((cok) => cok.name)
      //   ),
      //   origin_contact_phone: props.map((a) =>
      //     a.cart?.store?.users.map((cok) => cok.phone)
      //   ),
      //   origin_address: props.map((a) =>
      //     a.cart?.store?.locations.map((jan) => jan.address)
      //   ),
      //   origin_note: props.map((awesome) =>
      //     awesome.cart?.store?.locations.map((cool) => cool.addressNote)
      //   ),
      //   origin_coordinate: {
      //     latitude: -6.2253114,
      //     longitude: 106.7993735,
      //   },
      //   origin_postal_code: "12440",
      //   destination_contact_name: "aguswandi",
      //   destination_contact_phone: "69696969",
      //   destination_contact_email: "agusw@andi.com",
      //   destination_address:
      //     "jl kasan misin No10, Rt01/Rw02, Kel. Cinangka, Kec. Cilandak, Kab. Bengkulu",
      //   destination_postal_code: "14470",
      //   destination_note:
      //     "antar sampai tujuan dan jangan diturunkan ditengah jalan",
      //   destination_cash_proof_of_delivery: true,
      //   destination_coordinate: {
      //     latitude: -6.28927,
      //     longitude: 106.77492000000007,
      //   },
      //   courier_company: "Grab",
      //   courier_type: "instant",
      //   courier_insurance: true,
      //   delivery_type: "later",
      //   delivery_date: "2024-09-24",
      //   delivery_time: "12:00",
      //   order_note: "satukan semua pesanan kedalam satu packaging",
      //   metadata: {},
      //   items: [
      //     {
      //       id: 1,
      //       name: "jaket cihuahua",
      //       image: "",
      //       description:
      //         "jaket yang cocok untuk kucing anda yang ingin di cosplay menjadi cihuahua",
      //       value: 99000,
      //       quantity: 2,
      //       height: 10,
      //       length: 20,
      //       weight: 0.5,
      //       width: 15,
      //     },
      //   ],
      // };

      const orderDataJSON = JSON.stringify(dataforBiteShip);

      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: orderDataJSON,
      };

      const responsebiteship = await fetch(
        `${baseUrl}${endpoint}`,
        requestOptions
      );
      const responseDataBITESHIP = await responsebiteship.json();

      alert(
        'Kami sedang mencarikan kurir untuk penjemputan paket anda, Mohon Menunggu'
      );
    } catch (error) {
      alert(error);
    }
  };

  const [modalText, setModalText] = useState('');
  return (
    <>
      {props.map((props) => (
        <Card mb={5} boxShadow={'xs'}>
          <Box>
            <Box mt={5}>
              <Box>
                <Flex justifyContent={'space-between'} px={2}>
                  <Button
                    bg={'#008F5D'}
                    color={'white'}
                    fontWeight={'bold'}
                    colorScheme="red.500"
                    size={'sm'}
                    pointerEvents={'none'}
                  >
                    Pesanan Baru
                  </Button>

                  {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                  <Button
                    bg={'transparent'}
                    border={'1px solid #D5D5D5'}
                    borderRadius={'full'}
                    fontSize={'14px'}
                    onClick={() => {
                      setModalText('Apakah sudah di pack dan siap dikirim?');
                      setSelectedProps(props);
                      onOpen();
                    }}
                  >
                    Proses Pesanan
                  </Button>
                  {/*  */}
                  {/* Modal */}
                  <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={() => {
                      setModalText('');
                      onClose();
                    }}
                  >
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Proses Pesanan</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text fontWeight="bold" mb="1rem">
                          {modalText}
                        </Text>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          colorScheme="blue"
                          mr={3}
                          onClick={() => {
                            setModalText('');
                            onClose();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            afterpacking();
                            onClose();
                          }}
                        >
                          Selesai di Packing
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
                <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                  {props.invoiceNumber}
                </Text>
                <hr />
                <Flex justifyContent={'space-between'}>
                  <Box display={'flex'} w={'80%'}>
                    <Image
                      w={'52px'}
                      h={'52px'}
                      display={'inline'}
                      src={`${props.cart?.cartItems.map((a) =>
                        a.product?.attachments.map((jancok) => jancok.url)
                      )}`}
                      mt={3}
                      mx={3}
                    />
                    <Link to={`/order/detail/${props.id}`}>
                      <Text
                        mt={4}
                        id="fm500"
                        fontSize={'16px'}
                        textOverflow={'ellipsis'}
                        overflow={'hidden'}
                        whiteSpace={'nowrap'}
                        fontWeight={'700'}
                      >
                        {props.cart?.cartItems.map((a) => a.product?.name)}
                      </Text>
                    </Link>
                    <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                      {props.cart?.cartItems.map((a) => a.qty)} Barang
                    </Text>
                  </Box>
                  <Box mt={4} w={'15%'}>
                    <Flex gap={1}>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Total
                      </Text>
                      <Text color={'#909090'} fontSize={'14px'}>
                        Belanja
                      </Text>
                    </Flex>
                    {/* <Text fontWeight={'bold'} fontSize={'14px'}>
                      {formatCurrency(
                        props.cart?.cartItems.reduce(
                          (total, a) => total + a.price * a.qty,
                          0
                        ) as number
                      )}
                    </Text> */}
                    <Text fontWeight={'bold'} fontSize={'14px'}>
                      {formatCurrency(props.price)}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </Box>
          </Box>
        </Card>
      ))}
    </>
  );
}
