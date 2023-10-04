// // import { Box } from "@chakra-ui/react";

// // export default function NavOrderNew() {
// //   return (
// //     <>
// //       <Box></Box>
// //     </>
// //   );
// // }

// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {
//   Box,
//   Flex,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
// } from '@chakra-ui/react';
// import { Link } from '@remix-run/react';
// import { useState } from 'react';

// import ScrollBox from '../components/ScrollBox';

// // import CardCenceledNew from '~/components/CardCanceledNew';

// export default function NavOrderNew({ allOrderSevice }: any) {
//   const [activeTab, setActiveTab] = useState(0);
//   const handleClickTab = (index: number) => {
//     setActiveTab(index);
//   };
//   // const { unpaidCard } = useLoaderData<typeof loader>();
//   return (
//     <>
//       <Box
//         key={allOrderSevice}
//         background={'whitesmoke'}
//         style={{ width: '100%', marginLeft: '-5px', marginRight: '50%' }}
//       >
//         <Box
//           background={'white'}
//           position={'fixed'}
//           top={'50'}
//           style={{
//             marginTop: '1.3%',
//             width: '47.5%',
//             height: '100%',
//             borderRadius: '10px',
//           }}
//         >
//           <Tabs>
//             <Box mt={4} mb={4} mx={5}>
//               <Text fontWeight={'bold'} fontSize={'20px'}>
//                 Daftar Pesanan
//               </Text>
//             </Box>

//             <Box>
//               <Box
//                 display={'flex'}
//                 overflow={'scroll'}
//                 sx={{
//                   '::-webkit-scrollbar': {
//                     // i want displayed scrollbar if user use mouse for scrolling, but if scrollbar not none is a no clear ,
//                     display: 'none',
//                   },
//                 }}
//                 mb={'10'}
//               >
//                 <Flex gap={5} paddingInline={'15px'}>
//                   <Box>
//                     <Link to={'/order/all'}>
//                       <Text>Semua</Text>
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Link to={'/order/unpaid'}>
//                       <Flex gap={2}>
//                         <Text>Belum</Text>
//                         <Text>Dibayar</Text>
//                       </Flex>
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Link to={'/order/ready'}>
//                       <Flex gap={2}>
//                         <Text>Pesanan</Text>
//                         <Text>Baru</Text>
//                       </Flex>
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Link to={'/order/send'}>
//                       <Flex gap={2}>
//                         <Text>Siap</Text>
//                         <Text>Dikirim</Text>
//                       </Flex>
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Link to={'/order/shipped'}>
//                       <Flex gap={2}>
//                         <Text>Dalam</Text>
//                         <Text>Pengiriman</Text>
//                       </Flex>
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Link to={'/order/success'}>
//                       <Flex gap={2}>
//                         <Text>Pesanan</Text>
//                         <Text>Selesai</Text>
//                       </Flex>
//                     </Link>
//                   </Box>
//                   <Box>
//                     <Link to={'/order/cancel'}>
//                       <Text>Dibatalkan</Text>
//                     </Link>
//                   </Box>
//                 </Flex>
//               </Box>
//             </Box>

//             <Box my={5} paddingBottom={'100px'} background={'white'}>
//               <ScrollBox>
//                 <CardCenceledNew />
//               </ScrollBox>
//             </Box>
//           </Tabs>
//         </Box>
//       </Box>
//     </>
//   );
// }
