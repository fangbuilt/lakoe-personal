// import {
//   Box,
//   Button,
//   Image,
//   Input,
//   Menu,
//   MenuButton,
//   MenuItem,
//   MenuList,
//   Tab,
//   TabList,
//   TabPanel,
//   TabPanels,
//   Tabs,
//   Text,
//   InputGroup,
//   InputLeftElement,
//   Checkbox,
// } from "@chakra-ui/react";
// import { Form } from "@remix-run/react";
// import AddCircle from "~/assets/icon-pack/add-circle.svg";
// import BoxSearch from "~/assets/icon-pack/box-search.svg";
// import { ChevronDownIcon } from "@chakra-ui/icons";
// import ProductCard from "./ProductCard";
// import ProductEmpty from "./ProductEmpty";
// import { useState } from "react";
// // import { IProduct } from "~/interfaces/product/product";
// // import  dummy  from "./../../utils/fake.json"

// export default function ProductBody() {

//   return (
//     <>
//       <Box w={"100%"} bgColor={"white"} borderRadius={10}>
//         <Box px={5} py={4} bgColor={"white"}>
//           <Box
//             display={"flex"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <Text fontWeight={"bold"} fontSize={"20px"}>
//               Daftar Produk
//             </Text>
//             <Button
//               borderRadius={20}
//               bgColor={"#0086B4"}
//               fontSize={"14px"}
//               color={"white"}
//               colorScheme={"#0086B4"}
//             >
//               <Image src={AddCircle} />
//               Tambah Produk
//             </Button>
//           </Box>
//         </Box>

//         <Tabs w={"100%"}>
//           <TabList px={1} >
//             <Tab>
//               <Text fontSize={"16px"}>Semua</Text>
//             </Tab>
//             <Tab>
//               <Text fontSize={"16px"}>Aktif</Text>
//             </Tab>
//             <Tab>
//               <Text fontSize={"16px"}>Nonaktif</Text>
//             </Tab>
//           </TabList>

//           <Box className="listSortir" px={5} py={3} display={"flex"} gap={2}>
//             <Form method="POST">
//               <InputGroup>
//                 <InputLeftElement
//                   pointerEvents="none"
//                   children={<Image src={BoxSearch} />}
//                 />
//                 <Input
//                   variant="outline"
//                   placeholder="Cari Produk"
//                   w={"200px"}
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                 />
//               </InputGroup>
//             </Form>
//             <Menu closeOnSelect={false}>
//               <MenuButton
//                 as={Button}
//                 rightIcon={<ChevronDownIcon />}
//                 variant="outline"
//                 bgColor={"white"}
//                 w={"240px"}
//                 fontSize={"14px"}
//               >
//                 Semua Kategori
//               </MenuButton>
//               <MenuList>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Audio, Kamera & Elektronik</Checkbox>
//                 </MenuItem>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Buku</Checkbox>
//                 </MenuItem>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Dapur</Checkbox>
//                 </MenuItem>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Fashion Anak & Bayi</Checkbox>
//                 </MenuItem>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Fashion Muslim</Checkbox>
//                 </MenuItem>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Fashion Pria</Checkbox>
//                 </MenuItem>
//                 <MenuItem>
//                   <Checkbox defaultChecked>Fashion Wanita</Checkbox>
//                 </MenuItem>
//               </MenuList>
//             </Menu>
//             <Menu>
//               <MenuButton
//                 as={Button}
//                 rightIcon={<ChevronDownIcon />}
//                 w={"240px"}
//                 variant="outline"
//                 bgColor={"white"}
//                 fontSize={"14px"}
//               >
//                 Urutkan
//               </MenuButton>
//               <MenuList>
//                 <MenuItem>Terkahir Diubah</MenuItem>
//                 <MenuItem>Terlaris</MenuItem>
//                 <MenuItem>Kurang Diminati</MenuItem>
//                 <MenuItem>Harga Tertinggi</MenuItem>
//                 <MenuItem>Harga Terendah</MenuItem>
//                 <MenuItem>Stok Terbanyak</MenuItem>
//                 <MenuItem>Stok Tersedikit</MenuItem>
//               </MenuList>
//             </Menu>
//           </Box>
//           <TabPanels>
//             <TabPanel>
//               <Box
//                 display={"flex"}
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//               >
//                 <Text fontSize={"18px"} fontWeight={"bold"}>
//                   4 Produk
//                 </Text>
//                 <Box display={"flex"} gap={2}>
//                   <Text fontSize={"14px"}>Pilih Semua</Text>
//                   <Checkbox defaultChecked></Checkbox>
//                 </Box>
//               </Box>
//               {displayData.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//               {displayData.length === 0 && <ProductEmpty />}
//             </TabPanel>
//             <TabPanel>
//               <Box
//                 display={"flex"}
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//               >
//                 <Text fontSize={"18px"} fontWeight={"bold"}>
//                   4 Produk
//                 </Text>
//                 <Box display={"flex"} gap={2}>
//                   <Text fontSize={"14px"}>Pilih Semua</Text>
//                   <Checkbox defaultChecked></Checkbox>
//                 </Box>
//               </Box>
//               {/* <ProductCard /> */}
//               <ProductEmpty />

//             </TabPanel>
//             <TabPanel>
//               <Box
//                 display={"flex"}
//                 alignItems={"center"}
//                 justifyContent={"space-between"}
//               >
//                 <Text fontSize={"18px"} fontWeight={"bold"}>
//                   0 Produk
//                 </Text>
//                 <Box display={"flex"} gap={2}>
//                   <Text fontSize={"14px"}>Pilih Semua</Text>
//                   <Checkbox defaultChecked></Checkbox>
//                 </Box>
//               </Box>
//               <ProductEmpty />
//             </TabPanel>
//           </TabPanels>
//         </Tabs>
//       </Box>
//     </>
//   );
// }
