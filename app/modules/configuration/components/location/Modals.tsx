import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import type { ChangeEvent} from 'react';
import React, { useCallback, useEffect, useState } from 'react';

import { Form } from '@remix-run/react';
import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import type { ILocation } from '~/interfaces/Location';
import Maps from './Maps';

//interface modal
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}
//=======================

export function ModalCreateLocation({ isOpen, onClose }: CustomModalProps) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  // const openMapModal = () => {
  //   setIsMapModalOpen(true);
  //   onClose(); // Tutup modal utama
  // };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    onClose(); // Tutup modal utama saat menutup modal dalam modal
  };

  // ini logic select option ==================================================
  interface Provinsi {
    id: string;
    name: string;
  }

  interface Kabupaten {
    id: string;
    name: string;
  }

  interface Kecmatan {
    id: string;
    name: string;
  }

  // Deklarasikan state untuk menyimpan data provinsi
  const [provinsiOption, setProvinsiOption] = useState<Provinsi[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedProvinceName, setSelectedProvinceName] = useState('');

  const [kabupatenOption, setKabupatenOption] = useState<Kabupaten[]>([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState('');
  const [selectedKabupatenName, setSelectedKabupatenName] = useState('');

  const [kecamatanOption, setKecamatanOption] = useState<Kecmatan[]>([]);
  const [selectedKecamatan, setSelectedKecamatan] = useState('');
  const [selectedKecamatanName, setSelectedKecamatanName] = useState('');

  const fetchProvinsiData = useCallback(async () => {
    try {
      const response = await fetch(
        'https://api.binderbyte.com/wilayah/provinsi?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd'
      );
      console.log('data Provinsi : ', response);
      console.log('set provinsi :', selectedProvinceName);
      const data = await response.json();
      if (data.code === '200') {
        setProvinsiOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching provinsi data:', error);
    }
  }, [selectedProvinceName]);

  const fetchKabupatenData = useCallback(async () => {
    try {
      const id = selectedProvince.split(',')[0];
      const name = selectedProvince.split(',')[1];
      setSelectedProvinceName(name);
      console.log('Name Provinsi : ', name);
      const response = await fetch(
        `https://api.binderbyte.com/wilayah/kabupaten?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_provinsi=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log('data Kabupaten: ', data);
        console.log('set kabupaten : ', selectedKabupatenName);
        setKabupatenOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching kabupaten data:', error);
    }
  }, [selectedProvince, selectedKabupatenName]);

  const fetchKecamatanData = useCallback(async () => {
    try {
      const id = selectedKabupaten.split(',')[0];
      const name = selectedKabupaten.split(',')[1];
      setSelectedKabupatenName(name);
      console.log('Name Kabupaten : ', name);
      const response = await fetch(
        `https://api.binderbyte.com/wilayah/kecamatan?api_key=0ddfc24514a47d4cf2fbed43a7d4b151ec2944fceb30f8586d94e4501d29a5cd&id_kabupaten=${id}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log('data Kecamatan : ', data);
        console.log('set kabupaten : ', selectedKecamatanName);

        setKecamatanOption(data.value);
      }
    } catch (error) {
      console.error('Error fetching kecamatan data:', error);
    }
  }, [selectedKabupaten, selectedKecamatanName]);

  //console.log("kecamatan name :", selectedKecamatanName);

  useEffect(() => {
    fetchProvinsiData();
  }, [fetchProvinsiData]);

  useEffect(() => {
    if (selectedProvince) {
      fetchKabupatenData();
    } else {
      setKabupatenOption([]);
    }
  }, [selectedProvince, fetchKabupatenData]);

  useEffect(() => {
    if (selectedKabupaten) {
      fetchKecamatanData();
    } else {
      setKecamatanOption([]);
    }
  }, [selectedKabupaten, fetchKecamatanData]);

  const handleKabupatenChange = (event: any) => {
    setSelectedKabupaten(event.target.value);
  };

  const handleKecamatanChange = (event: any) => {
    setSelectedKecamatan(event.target.value);
    setSelectedKecamatanName(event.target.value.split(',')[1]);
  };

  //=======================================================================================

  //ini untuk alert ===============================================================
  const [showAlert, setShowAlert] = useState(false);

  // untuk huurf kapital di awal
  const [name, setName] = useState<string>('');

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Mengubah huruf pertama menjadi huruf kapital
    const capitalizedInput =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setName(capitalizedInput);
  };

  const [address, setAddress] = useState<string>('');

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    // Mengubah huruf pertama menjadi huruf kapital
    const capitalizedInput =
      inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
    setAddress(capitalizedInput);
  };
  //======================================================================================
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text>Tambah Lokasi Baru</Text>
            <Button
              onClick={onClose}
              p={'0px'}
              colorScheme="none"
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'end'}
              alignItems={'center'}
            >
              <Image w={'30px'} src={CloseCircle} />
            </Button>
          </ModalHeader>

          {/* <ModalCloseButton /> */}
          <Form method="post">
            <ModalBody>
              <Input hidden name="actionType" value="createlocation" />
              <FormControl isRequired>
                <FormLabel>Nama Lokasi</FormLabel>
                <Input
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Cth. Toko Alamanda"
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Provinsi</FormLabel>
                <Select
                  name="province"
                  placeholder="Cari Provinsi"
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                >
                  {provinsiOption.map((option) => (
                    <option
                      key={option.id}
                      value={option.id + ',' + option.name}
                    >
                      {option.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kabupaten</FormLabel>
                <Select
                  name="kabupaten"
                  placeholder="Cari kabupaten"
                  value={selectedKabupaten}
                  onChange={handleKabupatenChange}
                >
                  {kabupatenOption.map((kabupaten) => (
                    <option
                      key={kabupaten.id}
                      value={kabupaten.id + ',' + kabupaten.name}
                    >
                      {kabupaten.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kecamatan</FormLabel>
                <Select
                  name="cityDistrict"
                  placeholder="Cari Kecamatan"
                  value={selectedKecamatan}
                  onChange={handleKecamatanChange}
                >
                  {kecamatanOption.map((kecamatan) => (
                    <option
                      key={kecamatan.id}
                      value={kecamatan.id + ',' + kecamatan.name}
                    >
                      {kecamatan.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kode Pos</FormLabel>
                <Select name="postalCode">
                  <option value="" hidden color="red">
                    Masukan 5 digit kode pos
                  </option>
                  <option value="11111">11111</option>
                  <option value="22222">22222</option>
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Alamat Lengkap</FormLabel>
                <Textarea
                  name="address"
                  placeholder="Tuliskan Alamat lengkap Toko"
                  value={address}
                  onChange={handleTextareaChange}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Pinpoint Lokasi</FormLabel>
                <Text fontSize={'sm'} color={'grey'} mb={'30px'}>
                  Tandai lokasi untuk mempermudah pemintaan pickup kurir
                </Text>
                <Maps />
                {/* <Box position={'relative'}>
                  <Button
                    bg={'transparent'}
                    top={'2px'}
                    left={'120px'}
                    display={'flex'}
                    flexDirection={'row'}
                    zIndex={'1'}
                    position={'absolute'}
                    alignItems={'center'}
                    gap={1}
                    colorScheme="none"
                    onClick={openMapModal}
                  >
                    <Image src={LocationSlash} />
                    <Text color={'blue.500'} fontWeight={'bold'}>
                      Ubah Pinpoint
                    </Text>
                  </Button>
                  <IconButton
                    icon={
                      <img
                        style={{
                          borderRadius: '10px',
                          objectFit: 'cover',
                          height: '80px',
                          width: '1000px',
                          filter: 'blur(1px)',
                        }}
                        src="https://i.stack.imgur.com/B6fEt.png"
                        alt="Gambar"
                      />
                    }
                    onClick={openMapModal}
                    aria-label="Tombol Gambar"
                  />
                </Box> */}
              </FormControl>
            </ModalBody>

            <ModalFooter mt={'30px'}>
              <Button mr={2} borderRadius={'20px'}>
                Batalkan
              </Button>
              <Button
                type="submit"
                colorScheme="blue"
                borderRadius={'20px'}
                onClick={() => {
                  // Simulasikan penyimpanan data (Anda dapat menggantinya dengan logika penyimpanan aktual Anda)
                  // Setelah data disimpan, tampilkan alert
                  setShowAlert(true);
                }}
              >
                Simpan
              </Button>
            </ModalFooter>
          </Form>
          {showAlert && (
            <Alert status="success" mt={4}>
              <AlertIcon />
              Data telah berhasil disimpan.
              <Button
                onClick={() => {
                  setShowAlert(false);
                  // Opsional, Anda dapat merefresh halaman di sini
                  window.location.reload();
                }}
                position="absolute"
                right="8px"
                top="8px"
                borderRadius={'full'}
                bg={'green.500'}
                size={'sm'}
                color={'white'}
                colorScheme="green"
              >
                OK!
              </Button>
            </Alert>
          )}
        </ModalContent>
      </Modal>

      {/* Modal dalam modal */}
      <Modal
        isCentered
        size={'xl'}
        isOpen={isMapModalOpen}
        onClose={closeMapModal}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        {/* Konten modal dalam modal */}
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text>Tentukan titik pinpoint lokasi kamu</Text>
            <Button
              onClick={closeMapModal}
              p={'0px'}
              colorScheme="none"
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'end'}
              alignItems={'center'}
            >
              <Image w={'30px'} src={CloseCircle} />
            </Button>
          </ModalHeader>
          <ModalBody>
            <Text fontSize={'sm'}>
              Pinpoint Lokasi <br /> Tandai lokasi untuk mempermudah pemintaan
              pickup kurir
            </Text>
            <Maps />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={closeMapModal}
              colorScheme="blue"
              borderRadius={'20px'}
              size={'sm'}
            >
              Pilih Lokasi & Lanjut Isi Alamat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ModalMaps({ isOpen, onClose }: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
      {/* <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>hi</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent> */}

      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text>Tentukan titik pinpoint lokasi kamu</Text>
          <Button
            onClick={onClose}
            p={'0px'}
            colorScheme="none"
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'end'}
            alignItems={'center'}
          >
            <Image w={'30px'} src={CloseCircle} />
          </Button>
        </ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Text>
            <span style={{ fontWeight: 'bold' }}>Pinpoint Lokasi</span> <br />
            Tandai lokasi untuk mempermudah pemintaan pickup kurir
          </Text>
          {/* <Pinpoint /> */}
        </ModalBody>
        <ModalFooter>
          <Button
            borderRadius="20px"
            colorScheme="blue"
            onClick={() => alert('Tombol Khusus Modal 2')}
          >
            Pilih Lokasi & Lanjut Isi Alamat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export function DeleteButton(props: ILocation) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        me={'7px'}
        size={'sm'}
        onClick={onOpen}
      >
        <Image w={'15px'} src={Trash} />
      </Button>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size={'xl'}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <Form method="post">
            <Input hidden name="id" value={props.id} />
            <Input hidden name="actionType" value="deletelocation" />
            <ModalHeader
              display={'flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text>Hapus Alamat</Text>
              <Button
                onClick={onClose}
                p={'0px'}
                colorScheme="none"
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'end'}
                alignItems={'center'}
              >
                <Image w={'30px'} src={CloseCircle} />
              </Button>
            </ModalHeader>
            {/* <ModalCloseButton /> */}
            <ModalBody>
              Apakah kamu yakin untuk menghapus
              <span style={{ fontWeight: 'bold' }}>
                {' '}
                {props.name}{' '}
              </span> <br /> Kamu tidak akan dapat mengembalikan alamat yang
              sudah dihapus.
            </ModalBody>
            <ModalFooter>
              <Button
                borderRadius="20px"
                colorScheme="white"
                color={'black'}
                border={'1px solid #aeaeae'}
                mr={3}
                onClick={onClose}
              >
                Batalkan
              </Button>
              <Button
                type="submit"
                borderRadius="20px"
                colorScheme="blue"
                //onClick={() => alert("Tombol Khusus Modal 2")}
                onClick={onClose}
              >
                Ya, Hapus
              </Button>
            </ModalFooter>
            {/* <Box>
              <Flex
                pt={4}
                justifyContent={"space-between"}
                alignItems={"center"}
                mb={3}
              >
                <Text fontSize={"xl"} fontWeight={"medium"}>
                  Hapus Template Pesan
                </Text>
                <Button
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"end"}
                  onClick={onClose}
                  variant={"link"}
                >
                  <Image w={"30px"} src={CloseCircle} />
                </Button>
              </Flex>
              <HStack spacing="3px">
                <Text>Apakah kamu yakin untuk menghapus</Text>
                <Text display={"flex"}>
                  <Text as={"b"}>{props.name}</Text>?
                </Text>
              </HStack>
              <Text>
                Sebab, kamu tidak akan dapat mengembalikan template pesan yang
              </Text>
              <Text>sudah dihapus.</Text>
              <Input hidden name="id" value={props.id} />
              <Flex justifyContent={"flex-end"} pb={4} mt={5}>
                <Button
                  variant={"outline"}
                  borderRadius={"full"}
                  mr={2}
                  onClick={onClose}
                >
                  Batalkan
                </Button>
                <Button
                  type="submit"
                  value="delete"
                  name="action"
                  colorScheme="blue"
                  color={"whiteAlpha.900"}
                  borderRadius={"full"}
                  onClick={onClose}
                >
                  Ya, Hapus
                </Button>
              </Flex>
            </Box> */}
          </Form>
        </ModalContent>
      </Modal>
    </Box>
  );
}
