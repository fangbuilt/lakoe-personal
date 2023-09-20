// import { Box, Button, Card, Flex, Img, Text } from '@chakra-ui/react';
// import { Link } from '@remix-run/react';
// import { UseSearch } from '../hooks/useSearchOrderUnpaid';

// export default function CardOrder() {
//   const { filteredOrders } = UseSearch();

//   return (
//     <>
//       {/* YOUR CARD IN HERE COPY AND PASTE TO NAVORDER IN TABPANEL */}
//       <Card mb={5}>
//         {filteredOrders.map((datas, index) => (
//           <Box key={index}>
//             <Box mt={5} borderTop={'1px'} borderColor={'gray.100'} py={'4'}>
//               <Box>
//                 <Flex justifyContent={'space-between'} px={2}>
//                   <Button
//                     bg={'gray.500'}
//                     color={'white'}
//                     fontWeight={'bold'}
//                     colorScheme="gray.600"
//                     size={'sm'}
//                     pointerEvents={'none'}
//                   >
//                     Pesanan Selesai
//                   </Button>

//                   <Link to={`http://wa.me/${datas.telephone}`}>
//                     <Button
//                       bg={'transparent'}
//                       border={'1px solid #D5D5D5'}
//                       borderRadius={'full'}
//                       fontSize={'14px'}
//                     >
//                       Hubungi Pembeli
//                     </Button>
//                   </Link>
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
//                       Rp.{datas.totalAmount}
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
