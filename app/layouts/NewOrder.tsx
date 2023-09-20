// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   Box,
//   Button,
//   Card,
//   Flex,
//   Img,
//   Modal,
//   ModalBody,
//   ModalCloseButton,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   ModalOverlay,
//   Text,
//   useDisclosure,
// } from '@chakra-ui/react';
// import { UseSearch } from '../hooks/useSearchOrder';
// import React, { useState } from 'react';

// export default function NewOrder() {
//   const { filteredOrders } = UseSearch();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleBalanceNotif = async () => {
//     try {
//       const mailerBaseUrl = 'https://connect.mailerlite.com';
//       const mailerEndPoint = '/api/subscribers';
//       const mailerApiKey =
//         'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiM2E4ZjZkNTMxMDdkY2M1MjZjM2M5YTQxY2JhMjg0ZjJlOTc5NmFjOTA2MjVkMzRjN2I5NTVmNDY1ODlkZjcxOGM5NzY5ZmYyMzU5OTcxZTkiLCJpYXQiOjE2OTQxNTU1NDQuMTI1MzUyLCJuYmYiOjE2OTQxNTU1NDQuMTI1MzU0LCJleHAiOjQ4NDk4MjkxNDQuMTIwNDQsInN1YiI6IjYxNDY4NSIsInNjb3BlcyI6W119.KgsXIIo-rqViucL5U0QTHaG-Nhp0YJn0c752CSW1taUIVgfP0Dyk-vL-mHEGCLWl4CROGPwtzGakauaIGV1A-ijvg_16vEz04u8xKRzzuP4F9Hza78RnhTXjewo6oEiB4_E3WwFU6qalQmzoNaSzmaBI4zi6HZOO29uEHtZRswRfmi5g1XmDyqo2SmaL6S3nTU7xMoHaBlvY7UnanzqdpX0nr-nxS-05ADZRlo1a3YDQBihDFLzrhN8xgtXipU5O7nz18-Ivpj2TNjaMNk85zZukLYPxF1lVXrbNFWKVWJKMk9gthqMWsPDQTg7GexZSE-0uzZL8CO1azw_hCdJUJQYM3KYw1pb6PUm4YSO-Br4etsClpICaivipa5EGSOKF3wvAhyHa12ZIZuJcBadQPyAaiDi8a0s1O6UbLMBa_45oDDfeNQsEpXg9i5hkAe7H0DEdgM69JMh0zmu4Vi8s3f_fmz0pfGjXfKVT6g0KHx0K6AYhN714R2x6FOB-au4QrPlE_UdvIOO959uozJ4CHHiBKClWcTLRELWwCPmo6y5s-K8_s7h1czfV2MVx5mfihABiLyxCv3y6EwxgTi6gjKiN4NcCMoGnxt0dwPos67QQ-gRn2SdQoN0rsrKGuZltLOBza1cnqoHAZAFHiSrJq332VNoJhNuXN-3MoXw1LCY';

//       const mailerData = {
//         email: 'miswaripujaayu+007unch@gmail.com',
//         fields: {
//           company: 'ADD MORE BALANCE', //company berperan sebagai "title" dalam mailerlite
//           last_name:
//             "you need to add more balance to your platform system so that your sellers can keep sending packages to their customer without being delayed just because you're lack of money. do what you gotta do", //last_name berperan sebagai isian pesan ("message") dalam mailerlite
//         },
//         groups: ['98713000939095999'],
//       };

//       const mailerRequest = {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${mailerApiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(mailerData),
//       };

//       const response = await fetch(
//         `${mailerBaseUrl}${mailerEndPoint}`,
//         mailerRequest
//       );
//       const responseData = await response.json();
//       console.log('Data Email :', responseData);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const systembalance = 1000; //saldo LAKOE

//   const afterpacking = () => {
//     if (systembalance > 50000) {
//       handleOrderCourier();
//     } else {
//       handleBalanceNotif();
//     }
//   };

//   const handleOrderCourier = async () => {
//     try {
//       const baseUrl = 'https://api.biteship.com';
//       const endpoint = '/v1/orders';
//       const apiKey = process.env.API_COURIER;

//       const orderData = {
//         shipper_contact_name: 'megakuningan',
//         shipper_contact_phone: '081277882932',
//         shipper_contact_email: 'biteship@test.com',
//         shipper_organization: 'Biteship Org Test',
//         origin_contact_name: 'megakuningan',
//         origin_contact_phone: '081740781720',
//         origin_address: 'Plaza Senayan, Jalan Asia Afrika...',
//         origin_note: 'Deket pintu masuk STC',
//         origin_coordinate: {
//           latitude: -6.2253114,
//           longitude: 106.7993735,
//         },
//         origin_postal_code: 12440,
//         destination_contact_name: 'stevanus miswari',
//         destination_contact_phone: '08170032123',
//         destination_contact_email: 'jon@test.com',
//         destination_address: 'Lebak Bulus MRT...',
//         destination_postal_code: 12950,
//         destination_note: 'Near the gas station',
//         destination_cash_proof_of_delivery: true,
//         destination_coordinate: {
//           latitude: -6.28927,
//           longitude: 106.77492000000007,
//         },
//         courierName: 'grab',
//         courierService: '',
//         courier_insurance: 500000,
//         delivery_type: 'later',
//         delivery_date: '2024-09-24',
//         delivery_time: '12:00',
//         order_note: 'Please be careful',
//         metadata: {},
//         items: [
//           {
//             id: '5db7ee67382e185bd6a14608',
//             name: 'Black L',
//             image: '',
//             description: 'White Shirt',
//             value: 165000,
//             quantity: 1,
//             height: 10,
//             length: 10,
//             weight: 200,
//             width: 10,
//           },
//         ],
//       };

//       const requestOptions = {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${apiKey}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(orderData),
//       };

//       const response = await fetch(`${baseUrl}${endpoint}`, requestOptions);
//       const responseData = await response.json();

//       alert(responseData);
//     } catch (error) {
//       alert(error);
//     }
//   };

//   const [modalText, setModalText] = useState('');

//   return (
//     <>
//       <Card mb={5}>
//         {filteredOrders.map((datas, index) => (
//           <Box key={index}>
//             <Box mt={5} borderTop={'1px'} borderColor={'gray.100'} py={'4'}>
//               <Box>
//                 <Flex justifyContent={'space-between'} px={2}>
//                   <Button
//                     bg={'#008F5D'}
//                     color={'white'}
//                     fontWeight={'normal'}
//                     colorScheme="gray.600"
//                     size={'sm'}
//                     pointerEvents={'none'}
//                   >
//                     Pesanan Baru
//                   </Button>
//                   <Button
//                     bg={'transparent'}
//                     border={'1px solid #D5D5D5'}
//                     borderRadius={'full'}
//                     fontSize={'14px'}
//                     onClick={() => {
//                       setModalText(
//                         'You can scroll the content behind the modal'
//                       );
//                       onOpen();
//                     }}
//                   >
//                     Proses Pesanan
//                   </Button>
//                   {/* Modal */}
//                   <Modal
//                     blockScrollOnMount={false}
//                     isOpen={isOpen}
//                     onClose={() => {
//                       setModalText('');
//                       onClose();
//                     }}
//                   >
//                     <ModalOverlay />
//                     <ModalContent>
//                       <ModalHeader>Proses Pesanan</ModalHeader>
//                       <ModalCloseButton />
//                       <ModalBody>
//                         <Text fontWeight="bold" mb="1rem">
//                           {modalText}
//                         </Text>
//                       </ModalBody>
//                       <ModalFooter>
//                         <Button
//                           colorScheme="blue"
//                           mr={3}
//                           onClick={() => {
//                             setModalText('');
//                             onClose();
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           onClick={() => {
//                             afterpacking();
//                             onClose();
//                           }}
//                         >
//                           Selesai di Packing
//                         </Button>
//                       </ModalFooter>
//                     </ModalContent>
//                   </Modal>
//                 </Flex>
//                 <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
//                   {datas.invoice}
//                 </Text>
//                 <hr />
//                 <Flex justifyContent={'space-between'}>
//                   <Box display={'flex'}>
//                     <Img
//                       src={`${datas.imageProduct}`}
//                       w={'62px'}
//                       h={'62px'}
//                       display={'inline'}
//                     />
//                     <Text mt={4} id="fm500" fontWeight={'bold'}>
//                       {datas.titleProduct}
//                       <Text color={'gray.400'} fontWeight={'normal'}>
//                         1 Barang
//                       </Text>
//                     </Text>
//                   </Box>
//                   <Box me={5} mt={4}>
//                     <Flex gap={1}>
//                       <Text color={'#909090'} fontSize={'14px'}>
//                         Total
//                       </Text>
//                       <Text color={'#909090'} fontSize={'14px'}>
//                         Belanja
//                       </Text>
//                     </Flex>
//                     <Text fontWeight={'bold'} fontSize={'14px'}>
//                       Rp 200.000
//                     </Text>
//                   </Box>
//                 </Flex>
//               </Box>
//             </Box>
//           </Box>
//         ))}
//       </Card>
//     </>
//   );
// }
