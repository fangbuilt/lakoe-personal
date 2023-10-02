// import React, { useEffect, useState } from 'react';
// import {
//   FormControl,
//   FormLabel,
//   Select,
//   Box,
//   Button,
//   ChakraProvider,
//   Center,
//   Input,
//   Textarea,
//   Text,
//   Flex,
// } from '@chakra-ui/react';
// import { Form } from '@remix-run/react';
// import Maps from './Maps';
// import { ActionArgs, redirect } from '@remix-run/node';
// import createLocation from '../../configuration.service';

// export async function action({ request }: ActionArgs) {
//   const formData = await request.formData();
//   console.log('ini isi dari formData', formData);

//   const actionType = formData.get('actionType');
//   console.log('ini isi dari actionType', actionType);

//   const name = formData.get('name');
//   const address = formData.get('address');
//   const latitude = formData.get('latitude');
//   const longtitude = formData.get('longtitude');
//   const cityDistrict = formData.get('cityDistrict');
//   const postalCode = formData.get('postalCode');
//   const isMainLocation = true;
//   console.log('ini isi dari name :', name);
//   console.log('ini isi dari adres :', address);
//   console.log('ini isi dari lat :', latitude);
//   console.log('ini isi dari long :', longtitude);
//   console.log('ini isi dari city :', cityDistrict);
//   console.log('ini isi dari poscode :', postalCode);
//   console.log('ini isi dari isman :', isMainLocation);

//   if (actionType === 'create') {
//     console.log('iniiiiiiii');

//     await createLocation({
//       name,
//       address,
//       latitude,
//       longtitude,
//       cityDistrict,
//       postalCode,
//       isMainLocation,
//     });
//     const redirectURL = `/cobaalamat `;
//     return redirect(redirectURL);
//   }
//   return null;
// }

// export default function AddressForm() {
//   // ini logic select option ==================================================
//   interface Provinsi {
//     id: string;
//     name: string;
//   }

//   interface Kabupaten {
//     id: string;
//     name: string;
//   }

//   interface Kecmatan {
//     id: string;
//     name: string;
//   }

//   // Deklarasikan state untuk menyimpan data provinsi
//   const [provinsiOption, setProvinsiOption] = useState<Provinsi[]>([]);
//   const [selectedProvince, setSelectedProvince] = useState('');
//   const [selectedProvinceName, setSelectedProvinceName] = useState('');

//   const [kabupatenOption, setKabupatenOption] = useState<Kabupaten[]>([]);
//   const [selectedKabupaten, setSelectedKabupaten] = useState('');
//   const [selectedKabupatenName, setSelectedKabupatenName] = useState('');

//   const [kecamatanOption, setKecamatanOption] = useState<Kecmatan[]>([]);
//   const [selectedKecamatan, setSelectedKecamatan] = useState('');
//   const [selectedKecamatanName, setSelectedKecamatanName] = useState('');

//   const fetchProvinsiData = async () => {
//     try {
//       const response = await fetch(
//         'https://api.binderbyte.com/wilayah/provinsi?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd'
//       );
//       console.log('data PRovinsi : ', response);
//       const data = await response.json();
//       if (data.code === '200') {
//         setProvinsiOption(data.value);
//       }
//     } catch (error) {
//       console.error('Error fetching provinsi data:', error);
//     }
//   };

//   const fetchKabupatenData = async () => {
//     try {
//       const id = selectedProvince.split(',')[0];
//       const name = selectedProvince.split(',')[1];
//       setSelectedProvinceName(name);
//       console.log('Name Provinsi : ', name);
//       const response = await fetch(
//         `https://api.binderbyte.com/wilayah/kabupaten?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_provinsi=${id}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         console.log('data Kabupaten: ', data);
//         setKabupatenOption(data.value);
//       }
//     } catch (error) {
//       console.error('Error fetching kabupaten data:', error);
//     }
//   };

//   const fetchKecamatanData = async () => {
//     try {
//       const id = selectedKabupaten.split(',')[0];
//       const name = selectedKabupaten.split(',')[1];
//       setSelectedKabupatenName(name);
//       console.log('Name Kabupaten : ', name);
//       const response = await fetch(
//         `https://api.binderbyte.com/wilayah/kecamatan?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_kabupaten=${id}`
//       );
//       if (response.ok) {
//         const data = await response.json();
//         console.log('data Kecamatan : ', data);

//         setKecamatanOption(data.value);
//       }
//     } catch (error) {
//       console.error('Error fetching kecamatan data:', error);
//     }
//   };

//   console.log('kecamatan provinsi :', selectedProvinceName);
//   console.log('kecamatan kabupaten :', selectedKabupatenName);
//   console.log('kecamatan name :', selectedKecamatanName);

//   useEffect(() => {
//     fetchProvinsiData();
//   }, []);

//   useEffect(() => {
//     if (selectedProvince) {
//       fetchKabupatenData();
//     } else {
//       setKabupatenOption([]);
//     }
//   }, [selectedProvince]);

//   useEffect(() => {
//     if (selectedKabupaten) {
//       fetchKecamatanData();
//     } else {
//       setKecamatanOption([]);
//     }
//   }, [selectedKabupaten]);

//   const handleKabupatenChange = (event: any) => {
//     setSelectedKabupaten(event.target.value);
//   };

//   const handleKecamatanChange = (event: any) => {
//     setSelectedKecamatan(event.target.value);
//     setSelectedKecamatanName(event.target.value.split(',')[1]);
//   };

//   //=======================================================================================
//   // ini logic maps ================================================================
//   // const [latitude, setLatitude] = useState<number | null>(null);
//   // const [longitude, setLongitude] = useState<number | null>(null);

//   // useEffect(() => {
//   //   // Fungsi untuk inisialisasi Google Maps API dan Autocomplete
//   //   const initializeMap = () => {
//   //     let map: google.maps.Map;
//   //     let marker: google.maps.Marker | null = null;
//   //     let autocomplete: google.maps.places.Autocomplete;

//   //     // Inisialisasi peta
//   //     map = new google.maps.Map(document.getElementById("map")!, {
//   //       center: { lat: -7.797068, lng: 110.370529 },
//   //       zoom: 15,
//   //     });

//   //     // Inisialisasi Autocomplete
//   //     const autocompleteInput = document.getElementById(
//   //       "autocomplete"
//   //     ) as HTMLInputElement;
//   //     autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {});

//   //     // Tambahkan event listener untuk mengambil koordinat saat memilih alamat dari autocomplete
//   //     autocomplete.addListener("place_changed", () => {
//   //       const place = autocomplete.getPlace();

//   //       if (place.geometry && place.geometry.location) {
//   //         const location = place.geometry.location;
//   //         const newLatitude = location.lat();
//   //         const newLongitude = location.lng();

//   //         // Update state dengan latitude dan longitude baru
//   //         setLatitude(newLatitude);
//   //         setLongitude(newLongitude);

//   //         // Geser peta ke lokasi yang baru dipilih
//   //         map.panTo(location);

//   //         // Hapus marker sebelumnya jika ada
//   //         if (marker) {
//   //           marker.setMap(null);
//   //         }

//   //         // Buat marker baru di lokasi yang baru dipilih
//   //         marker = new google.maps.Marker({
//   //           position: location,
//   //           map: map,
//   //           title: "Lokasi Anda",
//   //         });

//   //         // Tampilkan latitude dan longitude di konsol
//   //         console.log("Latitude:", newLatitude);
//   //         console.log("Longitude:", newLongitude);
//   //       }
//   //     });
//   //   };

//   //   // Buat elemen <script> untuk memuat pustaka Google Maps API
//   //   const googleMapScript = document.createElement("script");
//   //   googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBoh3wL5LQnixnbEAD3dJ4zlX0_hPBZR7s&libraries=places`;
//   //   googleMapScript.async = true;

//   //   // Tambahkan event listener untuk menangani saat pustaka Google Maps selesai dimuat
//   //   googleMapScript.onload = initializeMap;

//   //   // Tambahkan elemen <script> ke dalam body dokumen
//   //   document.body.appendChild(googleMapScript);
//   // }, []);
//   //========================================================================
//   return (
//     <ChakraProvider>
//       <Center>
//         <Flex flexDirection={'column'} gap={5}>
//           {/* <Box w={"500px"}>
//             <VStack spacing={4} align="start">
//               <FormControl>
//                 <FormLabel>Kota:</FormLabel>
//                 <Select
//                   placeholder="Pilih Kota"
//                   value={selectedCity}
//                   onChange={(e) => setSelectedCity(e.target.value)}
//                 >
//                   {Array.from(
//                     new Set(addressData.map((address) => address.city))
//                   ).map((city) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Kecamatan:</FormLabel>
//                 <Select
//                   placeholder="Pilih Kecamatan"
//                   value={selectedDistrict}
//                   onChange={(e) => setSelectedDistrict(e.target.value)}
//                 >
//                   {Array.from(
//                     new Set(
//                       filteredAddressData.map((address) => address.district)
//                     )
//                   ).map((district) => (
//                     <option key={district} value={district}>
//                       {district}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl>
//                 <FormLabel>Kelurahan:</FormLabel>
//                 <Select
//                   placeholder="Pilih Kelurahan"
//                   value={selectedSubDistrict}
//                   onChange={(e) => setSelectedSubDistrict(e.target.value)}
//                 >
//                   {filteredAddressData.map((address) => (
//                     <option key={address.id} value={address.subDistrict}>
//                       {address.subDistrict}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <Box>
//                 <Button colorScheme="blue">Simpan</Button>
//               </Box>
//             </VStack>
//           </Box> */}
//           <Box w={'500px'}>
//             <Form method="post">
//               <Input hidden name="actionType" value="create" />
//               <FormControl isRequired>
//                 <FormLabel>Nama Lokasi</FormLabel>
//                 <Input name="name" placeholder="Cth. Toko Alamanda" />
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>provinsi</FormLabel>
//                 <Select
//                   name="province"
//                   placeholder="Cari Provinsi"
//                   value={selectedProvince}
//                   onChange={(e) => setSelectedProvince(e.target.value)}
//                 >
//                   {provinsiOption.map((option) => (
//                     <option
//                       key={option.id}
//                       value={option.id + ',' + option.name}
//                     >
//                       {option.name}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>kabupaten</FormLabel>
//                 <Select
//                   name="kabupaten"
//                   placeholder="Cari kabupaten"
//                   value={selectedKabupaten}
//                   onChange={handleKabupatenChange}
//                 >
//                   {kabupatenOption.map((kabupaten) => (
//                     <option
//                       key={kabupaten.id}
//                       value={kabupaten.id + ',' + kabupaten.name}
//                     >
//                       {kabupaten.name}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>kecamatan</FormLabel>
//                 <Select
//                   name="cityDistrict"
//                   placeholder="Cari kota / Kecamatan"
//                   value={selectedKecamatan}
//                   onChange={handleKecamatanChange}
//                 >
//                   {kecamatanOption.map((kecamatan) => (
//                     <option
//                       key={kecamatan.id}
//                       value={kecamatan.id + ',' + kecamatan.name}
//                     >
//                       {kecamatan.name}
//                     </option>
//                   ))}
//                 </Select>
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Kode Pos</FormLabel>
//                 <Select name="postalCode">
//                   <option value="" hidden color="red">
//                     Masukan 5 digit kode pos
//                   </option>
//                   <option value="11111">11111</option>
//                   <option value="22222">22222</option>
//                 </Select>
//               </FormControl>

//               <FormControl mt={4} isRequired>
//                 <FormLabel>Alamat Lengkap</FormLabel>
//                 <Textarea
//                   name="address"
//                   placeholder="Tuliskan Alamat lengkap Toko"
//                 />
//               </FormControl>

//               <FormControl mt={4}>
//                 <FormLabel>Pinpoint Lokasi</FormLabel>
//                 <Text fontSize={'sm'} color={'grey'} mb={'30px'}>
//                   Tandai lokasi untuk mempermudah pemintaan pickup kurir
//                 </Text>
//                 <Maps />
//                 {/* <Box p={2} border={"1px solid #eaeaea"} borderRadius={"10px"}>
//                   <Input
//                     p={3}
//                     w={"100%"}
//                     id="autocomplete"
//                     type="text"
//                     placeholder="Cari alamat..."
//                     mb={"10px"}
//                     //bg={"red"}
//                   />
//                   <Box
//                     id="map"
//                     style={{ height: "300px", width: "400px" }}
//                   ></Box>
//                   {latitude !== null && longitude !== null && (
//                     <Box width={"400px"}>
//                       <Text>Latitude: {latitude}</Text>
//                       <Text>Longitude: {longitude}</Text>
//                       <Input name="latitude" type="text" value={latitude} />
//                       <Input name="longtitude" type="text" value={longitude} />
//                     </Box>
//                   )}
//                 </Box> */}
//               </FormControl>

//               <Button mr={2} borderRadius={'20px'}>
//                 Batalkan
//               </Button>
//               <Button type="submit" colorScheme="blue" borderRadius={'20px'}>
//                 Simpan
//               </Button>
//             </Form>
//           </Box>
//         </Flex>
//       </Center>
//     </ChakraProvider>
//   );
// }
