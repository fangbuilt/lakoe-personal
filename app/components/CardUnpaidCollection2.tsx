// import {
//   Box,
//   Button,
//   Text,
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

// import ChevronDownIcon from '../assets/icon-pack/arrow-dropdown.svg';
// import SearchProduct from '../assets/icon-pack/search-product.svg';
// import Empty from '../assets/icon-pack/empty-dot.svg';

// import UnpaidCard from './CardUnpaid';
// import CardReadyToShip from './CardReadyToShip';
// import CardCanceled from './CardCanceled';
// import { useLoaderData } from '@remix-run/react';
// import type { loader } from '~/routes/order';
// import React, { useState, useEffect } from 'react';
// import { useFilterCourier } from '~/hooks/useFilterCourier';
// import { useSortFilter } from '~/hooks/useSortFilter';
// // import searchFilter from '~/hooks/useSearchOrder';
// const CardUnpaidCollection2 = () => {
//   // Menggunakan destructuring untuk mendapatkan data yang diperlukan
//   const { unpaidCard, canceledService, getTemplateMessages } =
//     useLoaderData<typeof loader>();

//   // Menggabungkan data dari variabel ke dalam objek
//   const object2 = { data: unpaidCard };
//   const object3 = { data: canceledService };
//   const object4 = { data: getTemplateMessages };

//   // Membuat array yang berisi objek-objek tersebut
//   const arrayOfObjects: Array<{ data: any }> = [object2, object3, object4];

//   // Mengambil data dari array objek
//   const dataCollection = arrayOfObjects.map((item) => item.data);

//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredOrders, setFilteredOrders] = useState(dataCollection);

//   // Destructuring hook yang diperlukan
//   const { selectedCouriers, toggleCourier, getSelectedCourier } =
//     useFilterCourier();
//   const { selectedSortOption, setSortOption, getSelectedSortOption } =
//     useSortFilter();
//   console.log('dataCollection', dataCollection);

//   useEffect(() => {
//     const lowerQuery = searchQuery.toLowerCase();
//     const filtered = dataCollection.filter((items) => {
//       const productName =
//         items.cart?.cartItems
//           .map((item: any) => item.product?.name?.toLowerCase())
//           .flat() || [];

//       // Logika untuk filter berdasarkan searchQuery
//       return productName.some((name: any) => name && name.includes(lowerQuery));
//     });
//     setFilteredOrders(filtered);
//   }, [searchQuery]);
//   return (
//     <>
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
//             <Input
//               type="text"
//               placeholder="Cari Pesanan"
//               _placeholder={{
//                 opacity: 1,
//                 color: '#909090',
//                 fontSize: '14px',
//               }}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </InputGroup>

//           <Menu closeOnSelect={false}>
//             <MenuButton
//               as={Button}
//               variant="outline"
//               bgColor={'white'}
//               fontSize={'14px'}
//               width={'100%'}
//               color={getSelectedCourier() > 0 ? 'black' : '#909090'}
//               fontWeight={'normal'}
//               // me={2}
//             >
//               <Text fontSize="14px" textAlign="left">
//                 {getSelectedCourier() > 0
//                   ? `${getSelectedCourier()} Kurir terpilih`
//                   : 'Semua Kurir'}
//               </Text>

//               <Image
//                 src={ChevronDownIcon}
//                 position={'absolute'}
//                 fontSize={'2px'}
//                 right={2}
//                 top={3}
//               />
//             </MenuButton>

//             <MenuList>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('GoSend')}
//                   isChecked={selectedCouriers.includes('GoSend')}
//                 >
//                   GoSend
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('GrabExpress')}
//                   isChecked={selectedCouriers.includes('GrabExpress')}
//                 >
//                   GrabExpress
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('AnterAja')}
//                   isChecked={selectedCouriers.includes('AnterAja')}
//                 >
//                   AnterAja
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('JNE')}
//                   isChecked={selectedCouriers.includes('JNE')}
//                 >
//                   JNE
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('J&T')}
//                   isChecked={selectedCouriers.includes('J&T')}
//                 >
//                   J&T
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('Lion Parcel')}
//                   isChecked={selectedCouriers.includes('Lion Parcel')}
//                 >
//                   Lion Parcel
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('Ninja Xpress')}
//                   isChecked={selectedCouriers.includes('Ninja Xpress')}
//                 >
//                   Ninja Xpress
//                 </Checkbox>
//               </MenuItem>
//               <MenuItem>
//                 <Checkbox
//                   onChange={() => toggleCourier('Pos Indonesia')}
//                   isChecked={selectedCouriers.includes('Pos Indonesia')}
//                 >
//                   Pos Indonesia
//                 </Checkbox>
//               </MenuItem>
//             </MenuList>
//           </Menu>
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
//       {filteredOrders.map((item) => (
//         <div key={item.id}>
//           <UnpaidCard filteredOrders={item} />
//           <CardReadyToShip filteredOrders={item} />
//           <CardCanceled filteredOrders={item} />
//         </div>
//       ))}
//       {/* <UnpaidCard filteredOrders={filteredOrders} />
//       <CardReadyToShip filteredOrders={filteredOrders} />
//       <CardCanceled filteredOrders={filteredOrders} /> */}
//     </>
//   );
// };

// export default CardUnpaidCollection2;
