import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import { useState } from 'react';
import CircleClose from '~/assets/icon/close-circle.svg';

function TemplateMessage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = useState('');

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const updateState = (value: any) => {
    if (value === 'namaPembeli') {
      setValue((prevState) => prevState + '[Nama Pembeli]');
    } else if (value === 'namaProduk') {
      setValue((prevState) => prevState + '[Nama Produk]');
    } else if (value === 'namaToko') {
      setValue((prevState) => prevState + '[Nama Toko]');
    }
  };

  return (
    <>
      <Box width={'500px'} minWidth={'500px'}>
        <Button onClick={onOpen}>Temlate Massage Create</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent px={5} py={4}>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Text
                fontSize={'18px'}
                fontStyle={'normal'}
                color={'text-dark'}
                fontWeight={'bold'}
              >
                Buat Template Pesan Baru
              </Text>
              <Button onClick={onClose} variant={'link'}>
                <Image src={CircleClose} />
              </Button>
            </Box>
            <Form method="post">
              <Box fontFamily={'Plus Jakarta Sans'} py={3}>
                <FormControl id="order-id" isRequired mb={5}>
                  <FormLabel>Judul Pesan</FormLabel>
                  <Input
                    name="name"
                    type="text"
                    placeholder=" Pesanan Konfirmasi Pengiriman"
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Detail Isi Pesanan</FormLabel>
                </FormControl>

                <Box
                  alignItems={'flex-start'}
                  display={'flex'}
                  maxW={'fit-content'}
                  borderRadius={'50%'}
                  gap={'3'}
                >
                  <Button
                    bg={'white'}
                    name="StoreId"
                    height={'30px'}
                    value={'klik saya'}
                    onClick={() => updateState('namaPembeli')}
                    color={'var(--text-dark, #1D1D1D)'}
                    borderRadius={'var(--rounded-full, 9999px)'}
                    border={'1px solid var(--gray-300, #D5D5D5)'}
                  >
                    <Text color={'gray.500'} fontSize={'14px'}>
                      Nama Pembeli
                    </Text>
                  </Button>
                  <Button
                    name="storeId"
                    value={'ProdukName'}
                    bg={'white'}
                    height={'30px'}
                    borderRadius={'50px'}
                    onClick={() => updateState('namaProduk')}
                    border={'1px solid var(--gray-300, #D5D5D5)'}
                  >
                    <Text fontSize={'14px'} color={'gray.500'}>
                      Nama Produk
                    </Text>
                  </Button>
                  <Button
                    name="storeId"
                    value={'namaToko'}
                    borderRadius={'50px'}
                    bg={'white'}
                    onClick={() => updateState('namaToko')}
                    border={'1px solid var(--gray-300, #D5D5D5)'}
                    height={'30px'}
                  >
                    <Text fontSize={'14px'} color={'gray.500'}>
                      Nama Toko
                    </Text>
                  </Button>
                </Box>
                <Box mt={'10px'}>
                  <Textarea
                    name="content"
                    value={value}
                    height={'150px'}
                    color={'gray.500'}
                    placeholder="Tuliskan Pesanmu"
                    onChange={handleChange}
                  />
                </Box>
              </Box>

              <ModalFooter gap={'3'}>
                <Button
                  height={'40px'}
                  width={'103px'}
                  variant="ghost"
                  onClick={onClose}
                  gap={'var(--1, 4px)'}
                  borderRadius={'50px'}
                  border={'1px solid var(--gray-300, #D5D5D5)'}
                >
                  Batalkan
                </Button>
                <Button
                  type="submit"
                  onClick={onClose}
                  height={'40px'}
                  width={'103px'}
                  colorScheme="blue"
                  borderRadius={'50px'}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </Form>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default TemplateMessage;
