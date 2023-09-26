// import {
//   Box,
//   Button,
//   Center,
//   FormControl,
//   FormLabel,
//   Grid,
//   GridItem,
//   Image,
//   Input,
//   Text,
//   Textarea,
// } from "@chakra-ui/react";
// import type { ChangeEvent } from "react";
// import React, { useState } from "react";

// import type { ActionArgs } from "@remix-run/node";
// import {
//   unstable_composeUploadHandlers as composeUploadHandlers,
//   unstable_createMemoryUploadHandler as createMemoryUploadHandler,
//   unstable_parseMultipartFormData as parseMultipartFormData,
// } from "@remix-run/node";
// import { db } from "~/libs/prisma/db.server";
// import { uploadImage } from "~/utils/uploadImage";
// import { Form } from "@remix-run/react";

// export async function action({ request }: ActionArgs) {
//   if (request.method.toLowerCase() === "post") {
//     const uploadHandler = composeUploadHandlers(async ({ name, data }) => {
//       if (name !== "logoAttachment") {
//         return undefined;
//       }

//       const uploadedImage = await uploadImage(data);

//       return uploadedImage.secure_url;
//     }, createMemoryUploadHandler());

//     const formData = await parseMultipartFormData(request, uploadHandler);

//     const slogan = formData.get("slogan") as string;
//     const description = formData.get("description") as string;
//     const name = formData.get("name") as string;
//     const domain = `lakoe.store/${name}`;
//     const logoAttachment = formData.get("logoAttachment") as string;
//     console.log("ini logoAttachment", logoAttachment);

//     const data = {
//       slogan,
//       description,
//       name,
//       domain,
//       logoAttachment,
//     };

//     return await db.store.create({
//       data: {
//         slogan: data.slogan,
//         domain: data.domain,
//         name: data.name,
//         logoAttachment: data.logoAttachment,
//         description: data.description,
//       },
//     });
//   }

//   return null;
// }

// export default function LogoUpload() {
//   const [selectedImage, setSelectedImage] = useState<string | null>(null);

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         if (event.target) {
//           setSelectedImage(event.target.result as string);
//         }
//       };

//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Center h="100vh">
//       <Box
//         w="300px"
//         p={5}
//         boxShadow="md"
//         borderRadius="md"
//         bg="white"
//         textAlign="center"
//       >
//         <Form method="post" encType="multipart/form-data">
//           <Grid>
//             <GridItem>
//               <FormLabel fontSize={"13px"} color={"blackAlpha.700"}>
//                 Slogan
//               </FormLabel>
//               <Input
//                 fontSize={"13px"}
//                 placeholder="Buat slogan untuk toko"
//                 py={-5}
//                 name="slogan"
//               />
//             </GridItem>
//             <GridItem rowSpan={2}>
//               <FormLabel fontSize={"13px"} color={"blackAlpha.700"}>
//                 Deskripsi
//               </FormLabel>

//               <Textarea
//                 fontSize={"13px"}
//                 h={"145px"}
//                 resize={"none"}
//                 placeholder="Tuliskan deskripsi toko disini"
//                 // value={description}
//                 name="description"
//               />
//             </GridItem>

//             <GridItem colSpan={1}>
//               <FormLabel fontSize={"13px"} color={"blackAlpha.700"}>
//                 Nama Toko
//               </FormLabel>
//               <Input
//                 fontSize={"13px"}
//                 placeholder="Buat Nama Toko"
//                 // value={namaToko}
//                 name="name"
//               />

//               <Text
//                 display={"flex"}
//                 justifyContent={"end"}
//                 mt={1}
//                 fontSize={"13px"}
//                 color="blackAlpha.500"
//               ></Text>
//             </GridItem>
//           </Grid>

//           <Text fontSize="xl" fontWeight="bold" mb={4}>
//             Unggah Logo Toko
//           </Text>

//           <FormControl>
//             <FormLabel htmlFor="logoUpload">
//               Pilih gambar untuk logo toko:
//             </FormLabel>
//             <Input
//               type="file"
//               id="logoUpload"
//               name="logoAttachment"
//               accept=".jpg, .png, .jpeg, .pdf"
//               onChange={handleImageChange}
//             />
//           </FormControl>
//           {selectedImage && (
//             <Center mt={4}>
//               <Box
//                 border="1px solid"
//                 borderColor="gray.200"
//                 borderRadius="lg"
//                 p={4}
//               >
//                 <Image src={selectedImage} maxH="200px" maxW="200px" />
//               </Box>
//             </Center>
//           )}
//           <Button
//             type="submit"
//             mt={4}
//             colorScheme="teal"
//             size="sm"
//             disabled={!selectedImage}
//             onClick={() => {
//               console.log("URL gambar:", selectedImage);
//             }}
//           >
//             Simpan Logo
//           </Button>
//         </Form>
//       </Box>
//     </Center>
//   );
// }
