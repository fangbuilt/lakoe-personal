import React from 'react';
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
  Alert,
  useDisclosure,
  Box,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import CloseCircle from '~/assets/icon-pack/close-circle.svg';
import { Form } from '@remix-run/react';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalCreateLocation({ isOpen, onClose }: CustomModalProps) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
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
          </ModalBody>

          <ModalFooter>
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

export function CompExample() {
  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

  return isVisible ? (
    <Alert status="success">
      <AlertIcon />
      <Box>
        <AlertTitle>Success!</AlertTitle>
        <AlertDescription>
          Your application has been received. We will review your application
          and respond within the next 48 hours.
        </AlertDescription>
      </Box>
      <Button
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      >
        ok jing
      </Button>
    </Alert>
  ) : (
    <Button onClick={onOpen}>Show Alert</Button>
  );
}
// function App() {
//   const [isOpenModal1, setIsOpenModal1] = useState(false);
//   const [isOpenModal2, setIsOpenModal2] = useState(false);

//   const openModal1 = () => {
//     setIsOpenModal1(true);
//   };

//   const closeModal1 = () => {
//     setIsOpenModal1(false);
//   };

//   const openModal2 = () => {
//     setIsOpenModal2(true);
//   };

//   const closeModal2 = () => {
//     setIsOpenModal2(false);
//   };

//   return (
//     <div>
//       <Button onClick={openModal1}>Buka Modal 1</Button>
//       <Button onClick={openModal2}>Buka Modal 2</Button>

//       <ModalCreateLocation isOpen={isOpenModal1} onClose={closeModal1} />
//       <ModalDelete isOpen={isOpenModal2} onClose={closeModal2} />
//     </div>
//   );
// }

// export default App;
