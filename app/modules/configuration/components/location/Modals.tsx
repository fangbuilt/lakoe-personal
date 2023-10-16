import {
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
import type { ChangeEvent } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import { Form, useLoaderData } from '@remix-run/react';
import ReactLoading from 'react-loading';
import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import Edit from '~/assets/icon-pack/edit.svg';
import Trash from '~/assets/icon-pack/trash.svg';
import type { ILocation } from '~/interfaces/Location';
import Maps from './Maps';
import type { loader } from '~/routes/configuration_.storeConfiguration';

//interface modal
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}
//=======================
export function CreateButtonLocation() {
  const store = useLoaderData<typeof loader>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  //logic untuk postalcode=============
  const [postalCode, setPostalCode] = useState('');

  const handleChangePostalCode = (event: any) => {
    let inputValue = event.target.value;

    // Hapus semua karakter selain angka 0-9
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Batasi panjang input menjadi 5 karakter
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5);
    }

    // Perbarui nilai input
    setPostalCode(inputValue);
  };

  //===========================================

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
  //const [showAlert, setShowAlert] = useState(false);

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

  const [isLoading, setIsLoading] = useState(false);
  //const formRef = useRef<HTMLFormElement | null>(null);

  const handleOutsideSubmit = () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log('ini erro loading', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Setelah modal tertutup, atur ulang status loading
        onClose();
      }, 6000);
    }
  };

  return (
    <>
      <Button
        borderRadius={'20px'}
        border={'1px solid #aeaeae'}
        bg={'white'}
        fontSize={'12px'}
        size={'sm'}
        onClick={onOpen}
      >
        Tambah Lokasi
      </Button>
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
              <Input hidden name="action" value="createlocation" />
              <FormControl isRequired>
                <FormLabel>Nama Lokasi</FormLabel>
                <Input hidden value={store.store_id?.id} name="storeId" />
                <Input
                  type="text"
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
                    <option key={kecamatan.id} value={kecamatan.name}>
                      {kecamatan.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kode Pos</FormLabel>
                <Input
                  type="text"
                  name="postalCode"
                  placeholder="Masukan 5 digit kode pos"
                  value={postalCode}
                  onChange={handleChangePostalCode}
                />
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
              </FormControl>
            </ModalBody>

            <ModalFooter
              mt={'30px'}
              display={'Flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              {isLoading ? (
                <Box style={{ textAlign: 'center' }}>
                  <ReactLoading
                    type="spin"
                    color="#3b82f6"
                    height={35}
                    width={35}
                  />
                </Box>
              ) : (
                <>
                  <Box></Box>
                </>
              )}
              <Box>
                <Button mr={2} borderRadius={'20px'} onClick={onClose}>
                  Batalkan
                </Button>
                <Button
                  type="submit"
                  onClick={handleOutsideSubmit}
                  colorScheme="blue"
                  borderRadius={'20px'}
                >
                  Simpan
                </Button>
              </Box>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function ModalMaps({ isOpen, onClose }: CustomModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size={'xl'}>
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

export function DeleteButtonLocation(props: ILocation) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const handleOutsideSubmit = async () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log('ini erro loading', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Setelah modal tertutup, atur ulang status loading
      }, 3000);
    }
  };
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
            <Input hidden name="action" value="deletelocation" />
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
            <ModalFooter
              display={'Flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              {isLoading ? (
                <Box style={{ textAlign: 'center' }}>
                  <ReactLoading
                    type="spin"
                    color="#3b82f6"
                    height={35}
                    width={35}
                  />
                </Box>
              ) : (
                <>
                  <Box></Box>
                </>
              )}
              <Box>
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
                  //onClick={onClose}
                  onClick={handleOutsideSubmit}
                >
                  Ya, Hapus
                </Button>
              </Box>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export function UpdateButtonLocation(props: ILocation) {
  const store = useLoaderData<typeof loader>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  //logic untuk postalcode=============
  const [postalCode, setPostalCode] = useState('');

  const handleChangePostalCode = (event: any) => {
    let inputValue = event.target.value;

    // Hapus semua karakter selain angka 0-9
    inputValue = inputValue.replace(/[^0-9]/g, '');

    // Batasi panjang input menjadi 5 karakter
    if (inputValue.length > 5) {
      inputValue = inputValue.slice(0, 5);
    }

    // Perbarui nilai input
    setPostalCode(inputValue);
  };

  //============================================

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
  //const [showAlert, setShowAlert] = useState(false);

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

  //=================================================
  const [isLoading, setIsLoading] = useState(false);
  //const formRef = useRef<HTMLFormElement | null>(null);

  const handleOutsideSubmit = () => {
    try {
      setIsLoading(true);
    } catch (error) {
      console.log('ini erro loading', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Setelah modal tertutup, atur ulang status loading
        onClose();
      }, 6000);
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        borderRadius={'full'}
        bg={'white'}
        border={'1px solid #aeaeae'}
        p={'0px'}
        size={'sm'}
      >
        <Image w={'15px'} src={Edit} />
      </Button>
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
            <Text>Edit Lokasi</Text>
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
          <Form method="patch">
            <ModalBody>
              <Input hidden name="id" value={props.id} />
              <Input hidden name="action" value="editlocation" />
              <FormControl isRequired>
                <FormLabel>Nama Lokasi</FormLabel>
                <Input hidden value={store.store_id?.id} name="storeId" />
                <Input
                  name="name"
                  value={name}
                  onChange={handleNameChange}
                  placeholder={props.name}
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
                    <option key={kecamatan.id} value={kecamatan.name}>
                      {kecamatan.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kode Pos</FormLabel>
                <Input
                  type="text"
                  name="postalCode"
                  placeholder={'Masukan 5 digit kode pos'}
                  value={postalCode}
                  onChange={handleChangePostalCode}
                />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Alamat Lengkap</FormLabel>
                <Textarea
                  name="address"
                  placeholder={props.address}
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
              </FormControl>
            </ModalBody>

            <ModalFooter
              mt={'30px'}
              display={'Flex'}
              flexDirection={'row'}
              justifyContent={'space-between'}
            >
              {isLoading ? (
                <Box style={{ textAlign: 'center' }}>
                  <ReactLoading
                    type="spin"
                    color="#3b82f6"
                    height={35}
                    width={35}
                  />
                </Box>
              ) : (
                <>
                  <Box></Box>
                </>
              )}
              <Box>
                <Button mr={2} borderRadius={'20px'} onClick={onClose}>
                  Batalkan
                </Button>
                <Button
                  type="submit"
                  onClick={handleOutsideSubmit}
                  colorScheme="blue"
                  borderRadius={'20px'}
                >
                  Simpan
                </Button>
              </Box>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}

export function UpdateButtonMain(props: ILocation) {
  return (
    <Box>
      <Form method="patch">
        <Input hidden name="id" value={props.id} />
        <Input hidden name="action" value="editmainlocation" />
        <Button type="submit" borderRadius={'full'} size={'xs'}>
          Buat jadi alamat utama
        </Button>
      </Form>
    </Box>
  );
}
