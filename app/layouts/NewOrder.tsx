// import { Box, Button, Card, Flex, Img, Text } from "@chakra-ui/react";
// import { Link } from "@remix-run/react";
// import UseSearch from "../hooks/useSearchOrder";
// import MailerLite from "@mailerlite/mailerlite-nodejs";
// import { PrismaClient } from "@prisma/client";

// const biteShipAPI = process.env.BITESHIP_API as string;
// const mailerLiteAPI = process.env.MAILERLITE_API as string;

// interface CreateOrUpdateParams {
//   email: string;
//   fields?: object;
//   groups?: Array<string>;
//   status?: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
//   subscribed_at?: string;
//   ip_address?: string;
//   opted_in_at?: string;
//   optin_ip?: string;
//   unsubscribed_at?: string;
// }

// const mailerlite = new MailerLite({
//   api_key: mailerLiteAPI,
// });

// const prisma = new PrismaClient();

// export async function loader() {
//   const datash = await prisma.payment.findMany({
//     include: {
//       user: true,
//     },
//   });
// }

// export default function NewOrder() {
//   const { filteredOrders } = UseSearch();

//   return (
//     <>
//       {/* YOUR CARD IN HERE COPY AND PASTE TO NAVORDER IN TABPANEL */}
//       <Card mb={5}>
//         {filteredOrders.map((datas, index) => (
//           <Box key={index}>
//             <Box mt={5} borderTop={"1px"} borderColor={"gray.100"} py={"4"}>
//               <Box>
//                 <Flex justifyContent={"space-between"} px={2}>
//                   <Button
//                     bg={"#008F5D"}
//                     color={"white"}
//                     fontWeight={"normal"}
//                     colorScheme="gray.600"
//                     size={"sm"}
//                     pointerEvents={"none"}
//                   >
//                     Pesanan Selesai
//                   </Button>

//                   <Link to={`http://wa.me/${datas.telephone}`}>
//                     <Button
//                       bg={"transparent"}
//                       border={"1px solid #D5D5D5"}
//                       borderRadius={"full"}
//                       fontSize={"14px"}
//                     >
//                       Proses Pesanan
//                     </Button>
//                   </Link>
//                 </Flex>
//                 <Text my={1} fontSize={"14px"} color={"gray.400"} px={2}>
//                   {datas.invoice}
//                 </Text>
//                 <hr />
//                 <Flex justifyContent={"space-between"}>
//                   <Box display={"flex"}>
//                     <Img
//                       src={`${datas.imageProduct}`}
//                       w={"62px"}
//                       h={"62px"}
//                       display={"inline"}
//                     />
//                     <Text mt={4} id="fm500" fontWeight={"bold"}>
//                       {datas.titleProduct}
//                       <Text color={"gray.400"} fontWeight={"normal"}>
//                         1 Barang
//                       </Text>
//                     </Text>
//                   </Box>
//                   <Box me={5} mt={4}>
//                     <Flex gap={1}>
//                       <Text color={"#909090"} fontSize={"14px"}>
//                         Total
//                       </Text>
//                       <Text color={"#909090"} fontSize={"14px"}>
//                         Belanja
//                       </Text>
//                     </Flex>
//                     <Text fontWeight={"bold"} fontSize={"14px"}>
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
