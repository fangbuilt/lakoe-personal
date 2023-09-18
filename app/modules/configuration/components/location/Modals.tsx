import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  FormControl,
  Text,
  FormLabel,
  Input,
  Select,
  Textarea,
  Box,
  IconButton,
} from '@chakra-ui/react';

import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import LocationSlash from '~/assets/icon-pack/location-slash.svg';
import { Form } from '@remix-run/react';
import Maps from '../../Maps';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalCreateLocation({ isOpen, onClose }: CustomModalProps) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const openMapModal = () => {
    setIsMapModalOpen(true);
    onClose(); // Tutup modal utama
  };

  const closeMapModal = () => {
    setIsMapModalOpen(false);
    onClose(); // Tutup modal utama saat menutup modal dalam modal
  };

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
          <Form>
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Nama Lokasi</FormLabel>
                <Input ref={initialRef} placeholder="Cth. Toko Alamanda" />
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kota/Kecamatan</FormLabel>
                <Select>
                  <option value="" hidden>
                    Cari kota / Kecamatan
                  </option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Kode Pos</FormLabel>
                <Select>
                  <option value="" hidden color="red">
                    Masukan 5 digit kode pos
                  </option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Alamat Lengkap</FormLabel>
                <Textarea placeholder="Tuliskan Alamat lengkap Toko" />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Pinpoint Lokasi</FormLabel>
                <Text fontSize={'sm'} color={'grey'} mb={'30px'}>
                  Tandai lokasi untuk mempermudah pemintaan pickup kurir
                </Text>
                {/* <Maps /> */}
                <Box position={'relative'}>
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
                </Box>
              </FormControl>
            </ModalBody>

            <ModalFooter mt={'30px'}>
              <Button mr={2} onClick={onClose} borderRadius={'20px'}>
                Batalkan
              </Button>
              <Button colorScheme="blue" borderRadius={'20px'}>
                Simpan
              </Button>
            </ModalFooter>
          </Form>
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

export function ModalDelete({ isOpen, onClose }: CustomModalProps) {
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
          <span style={{ fontWeight: 'bold' }}> Rumah?</span> <br /> Kamu tidak
          akan dapat mengembalikan alamat yang sudah dihapus.
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
            borderRadius="20px"
            colorScheme="blue"
            onClick={() => alert('Tombol Khusus Modal 2')}
          >
            Ya, Hapus
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
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
