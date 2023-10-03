// import {
//   Accordion,
//   AccordionButton,
//   AccordionIcon,
//   AccordionItem,
//   AccordionPanel,
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
//   Input,
//   InputGroup,
//   InputLeftElement,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Image,
//   Checkbox,
// } from '@chakra-ui/react';
// // import queryString from 'query-string';
// // import { Form, Link } from '@remix-run/react';
// import SearchProduct from '../../assets/icon-pack/search-product.svg';
// import { useFilterCourierBad } from '~/hooks/useFilterCourierBad';
// import { useSortFilter } from '~/hooks/useSortFilter';
// import { createWhatsAppTemplateMessageUnpaid } from '~/utils/templateOrder';
// import ChevronDownIcon from '../../assets/icon-pack/arrow-dropdown.svg';
// import Empty from '../../assets/icon-pack/empty-dot.svg';

// import { Link, useLoaderData } from '@remix-run/react';
// import UseSearchProductUnpaid from '~/hooks/useSearchOrderUnpaid';
// import { loader } from '~/routes/order';
// import { useEffect, useState } from 'react';
// import axios from 'axios';

// // const axios = require('axios');


// export default function UnpaidCard() {
//   const { unpaidCard } = useLoaderData<typeof loader>();
//   // const data = unpaidCard?.items;

//   // const { filteredOrder, setSearchQuery } = UseSearchProductUnpaid();
//   // console.log('unpaidCard', unpaidCard);

//   // const { selectedSortOption, setSortOption, getSelectedSortOption } =
//   //   useSortFilter();
//   // console.log('setSearchQuery', setSearchQuery);
//   // console.log('searchQuery', searchQuery);
//   // console.log('filteredOrderfilteredOrderfilteredOrder', filteredOrder);

//   const { isOpen, onOpen, onClose } = useDisclosure();
// // get query string
// // const [datafilter, setDataFilter] = useState(''); // Sesuaikan tipe data sesuai respons yang diharapkan
// //   const [orderFilter, setOrderFilter] = useState<string>('');
// //   const [courierArrayFilter, setCourierArrayFilter] = useState<string>('');
// //   const [sortFilter, setSortFilter] = useState<string>('');

// //   console.log(datafilter, orderFilter, courierArrayFilter, sortFilter);

// //   useEffect(() => {
// //     const handleDataaa = async () => {
// //       try {
// //         const response = await axios.get(`http://localhost:3000/order?order=${orderFilter}&courier=${courierArrayFilter}&sort=${sortFilter}`);
// //         setDataFilter(response.data); // Set data yang diterima dari respons ke state
// //         console.log('datassh', response.data); // Cetak data ke konsol setelah respons diterima
// //       } catch (error) {
// //         console.error('Error:', error);
// //       }
// //     };
// //     handleDataaa();
// //   }, [orderFilter, courierArrayFilter, sortFilter, datafilter]);


//   return (
//     <>
//       {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}

//       <Box width={'100%'} display={'flex'} justifyContent={'center'}>
//         <Box
//           display={'flex'}
//           w={'47%'}
//           bg={'white'}
//           px={'3'}
//           gap={2}
//           justifyContent={'space-between'}
//           zIndex={10}
//           position={'fixed'}
//           top={'52'}
//           mt={2}
//         >
//           <InputGroup bg={'white'}>
//             <InputLeftElement pointerEvents="none">
//               <Image src={SearchProduct} />
//             </InputLeftElement>
//             {/* <Input
//               type="text"
//               placeholder="Cari Pesanan"
//               _placeholder={{
//                 opacity: 1,
//                 color: '#909090',
//                 fontSize: '14px',
//               }}
//               onChange={(e) => setOrderFilter(e.target.value)}
//             /> */}
//              <Input
//             defaultValue={unpaidCard.searchTerm as string}
//             placeholder="Cari Pesanan"
//             autoComplete="off"
//             name="search"
//             type="search"
//           />
//           </InputGroup>

//               {/* <Menu closeOnSelect={false}>
//                 <MenuButton
//                   as={Button}
//                   variant="outline"
//                   bgColor={'white'}
//                   fontSize={'14px'}
//                   width={'100%'}
//                   color={getSelectedCourierCount() > 0 ? 'black' : '#909090'}
//                   fontWeight={'normal'}
//                 >
//                   <Text fontSize="14px" textAlign="left">
//                     {getSelectedCourierCount() > 0
//                       ? `${getSelectedCourierCount()} Kurir terpilih`
//                       : 'Semua Kurir'}
//                   </Text>

//                   <Image
//                     src={ChevronDownIcon}
//                     position={'absolute'}
//                     fontSize={'2px'}
//                     right={2}
//                     top={3}
//                   />
//                 </MenuButton>

//                 <MenuList>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('GoSend')}
//                       isChecked={selectedCouriers.includes('GoSend')}
//                     >
//                       GoSend
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('GrabExpress')}
//                       isChecked={selectedCouriers.includes('GrabExpress')}
//                     >
//                       GrabExpress
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('AnterAja')}
//                       isChecked={selectedCouriers.includes('AnterAja')}
//                     >
//                       AnterAja
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('jne')}
//                       isChecked={selectedCouriers.includes('jne')}
//                     >
//                       JNE
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('J&T')}
//                       isChecked={selectedCouriers.includes('J&T')}
//                     >
//                       J&T
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('tiki')}
//                       isChecked={selectedCouriers.includes('tiki')}
//                     >
//                       Tiki
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('Ninja Xpress')}
//                       isChecked={selectedCouriers.includes('Ninja Xpress')}
//                     >
//                       Ninja Xpress
//                     </Checkbox>
//                   </MenuItem>
//                   <MenuItem>
//                     <Checkbox
//                       onChange={() => toggleCourier('pos')}
//                       isChecked={selectedCouriers.includes('pos')}
//                     >
//                       pos
//                     </Checkbox>
//                   </MenuItem>
//                 </MenuList>
//               </Menu> */}
//           <Menu closeOnSelect={false}>
//             <MenuButton
//               as={Button}
//               w={'100%'}
//               variant="outline"
//               bgColor={'white'}
//               // me={2}
//             >
//               <Image
//                 src={ChevronDownIcon}
//                 position={'absolute'}
//                 fontSize={'2px'}
//                 right={2}
//                 top={3}
//               />
//               <Text
//                 fontSize={'14px'}
//                 textAlign={'left'}
//                 fontWeight={'normal'}
//                 color={'black'}
//               >
//                 {getSelectedSortOption() ? (
//                   getSelectedSortOption()
//                 ) : (
//                   <Text color={'#909090'}>Urutkan</Text>
//                 )}
//               </Text>
//             </MenuButton>
//             <MenuList>
//               <MenuItem
//                 onClick={() => setSortOption('Semua')}
//                 className={selectedSortOption === 'Semua' ? 'active' : ''}
//               >
//                 Semua
//                 <Image
//                   src={Empty}
//                   ml={'auto'}
//                   display={
//                     selectedSortOption === 'Semua' ? 'inline-block' : 'none'
//                   }
//                 />
//               </MenuItem>
//               <MenuItem
//                 onClick={() => setSortOption('Paling Baru')}
//                 className={selectedSortOption === 'Paling Baru' ? 'active' : ''}
//               >
//                 Paling Baru
//                 <Image
//                   src={Empty}
//                   ml={'auto'}
//                   display={
//                     selectedSortOption === 'Paling Baru'
//                       ? 'inline-block'
//                       : 'none'
//                   }
//                 />
//               </MenuItem>
//               <MenuItem
//                 onClick={() => setSortOption('Paling Lama')}
//                 className={selectedSortOption === 'Paling Lama' ? 'active' : ''}
//               >
//                 Paling Lama
//                 <Image
//                   src={Empty}
//                   ml={'auto'}
//                   display={
//                     selectedSortOption === 'Paling Lama'
//                       ? 'inline-block'
//                       : 'none'
//                   }
//                 />
//               </MenuItem>
//               <MenuItem
//                 onClick={() => setSortOption('Respon Tercepat')}
//                 className={
//                   selectedSortOption === 'Respon Tercepat' ? 'active' : ''
//                 }
//               >
//                 Respon Tercepat
//                 <Image
//                   src={Empty}
//                   ml={'auto'}
//                   display={
//                     selectedSortOption === 'Respon Tercepat'
//                       ? 'inline-block'
//                       : 'none'
//                   }
//                 />
//               </MenuItem>
//               <MenuItem
//                 onClick={() => setSortOption('Respon Terlama')}
//                 className={
//                   selectedSortOption === 'Respon Terlama' ? 'active' : ''
//                 }
//               >
//                 Respon Terlama
//                 <Image
//                   src={Empty}
//                   ml={'auto'}
//                   display={
//                     selectedSortOption === 'Respon Terlama'
//                       ? 'inline-block'
//                       : 'none'
//                   }
//                 />
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         </Box>
//       </Box>

//       {/* CARD START HERE */}
//       { unpaidCard.map((item) => (
//         // eslint-disable-next-line react/jsx-key
//         <Card mb={5} boxShadow={'xs'}>
//           <Box key={item.id}>
//             <Box mt={5}>
//               <Box>
//                 <Flex justifyContent={'space-between'} px={2}>
//                   <Button
//                     bg={'#E8C600'}
//                     color={'white'}
//                     textShadow={'1px 1px 1px gray'}
//                     fontWeight={'bold'}
//                     colorScheme="red.500"
//                     size={'sm'}
//                     pointerEvents={'none'}
//                   >
//                     {item.status === "UNPAID" ? "Belum Dibayar" : "" }
//                   </Button>

//                   {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
//                   <Button
//                     bg={'transparent'}
//                     border={'1px solid #D5D5D5'}
//                     borderRadius={'full'}
//                     fontSize={'14px'}
//                     onClick={() => {
//                       onOpen();
//                     }}
//                   >
//                     Hubungi Pembeli
//                   </Button>
//                   <Modal onClose={onClose} isOpen={isOpen} isCentered>
//                     <ModalOverlay background={'whiteAlpha.50'} />
//                     <ModalContent>
//                       <ModalHeader>
//                         Send Message ke {item.receiverName}
//                       </ModalHeader>
//                       <ModalCloseButton />
//                       <ModalBody>
//                         <Accordion allowToggle>
//                           {item.cart?.store?.messageTemplates.map(
//                             (itemtemp) => (
//                               <AccordionItem key={itemtemp.id}>
//                                 <Text>
//                                   <AccordionButton>
//                                     <Box as="span" flex="1" textAlign="left">
//                                       Pesan {itemtemp.id}
//                                     </Box>
//                                     <AccordionIcon />
//                                   </AccordionButton>
//                                 </Text>
//                                 <AccordionPanel pb={4}>
//                                   {itemtemp.content}
//                                   <Button
//                                     colorScheme={'whatsapp'}
//                                     float={'right'}
//                                   >
//                                     <Link
//                                       to={createWhatsAppTemplateMessageUnpaid(
//                                         item.receiverPhone ?? '',
//                                         itemtemp.content
//                                       )}
//                                       target="_blank"
//                                     >
//                                       Kirim
//                                     </Link>
//                                   </Button>
//                                 </AccordionPanel>
//                               </AccordionItem>
//                             )
//                           )}
//                         </Accordion>
//                       </ModalBody>
//                       <ModalFooter></ModalFooter>
//                     </ModalContent>
//                   </Modal>
//                   {/*  */}
//                 </Flex>
//                 <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
//                   {item.invoiceNumber}
//                 </Text>
//                 <hr />
//                 <Link to={`detail${item.id}`}>
//                 <Flex justifyContent={'space-between'}>
//                   <Box display={'flex'} w={'80%'}>
//                     <Img
//                       w={'52px'}
//                       h={'52px'}
//                       display={'inline'}
//                       src={`${item.cart?.cartItems.map((item) =>
//                         item.product?.attachments.map((item) => item.url)
//                       )}`}
//                       mt={3}
//                     />
//                     <Text
//                       mt={4}
//                       id="fm500"
//                       fontSize={'16px'}
//                       textOverflow={'ellipsis'}
//                       overflow={'hidden'}
//                       whiteSpace={'nowrap'}
//                       fontWeight={'700'}
//                     >
//                       {item.cart?.cartItems.map((item) => item.product?.name)}
//                       <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
//                         {item.cart?.cartItems.map((item) => item.qty)} Barang
//                       </Text>
//                     </Text>
//                   </Box>
//                   <Box mt={4} w={'15%'}>
//                     <Flex gap={1}>
//                       <Text color={'#909090'} fontSize={'14px'}>
//                         Total
//                       </Text>
//                       <Text color={'#909090'} fontSize={'14px'}>
//                         Belanja
//                       </Text>
//                     </Flex>
//                     <Text fontWeight={'bold'} fontSize={'14px'}>
//                       {/* {formatter.format(item.price)}
//                        */}
//                       Rp {item.price.toLocaleString('id-ID')}
//                     </Text>
//                   </Box>
//                 </Flex>
//                 </Link>
//               </Box>
//             </Box>
//           </Box>
//         </Card>
//       ))}

//       {/* END CARD */}
//     </>
//   );
// }
