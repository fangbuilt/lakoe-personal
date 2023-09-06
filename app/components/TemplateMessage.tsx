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
import CircleClose from '~/assets/icon/close-circle.svg';

interface TemplateMessage {
  pesan?: string;
  content?: string;
}

function TemplateMessage(props: TemplateMessage) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Box fontFamily={'Plus Jakarta Sans'} py={3}>
              <FormControl id="order-id" isRequired mb={5}>
                <FormLabel>Judul Pesan</FormLabel>
                <Input
                  type="text"
                  placeholder="Pesanan Konfirmasi Pengiriman"
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
                  borderRadius={'var(--rounded-full, 9999px)'}
                  bg={'white'}
                  border={'1px solid var(--gray-300, #D5D5D5)'}
                  color={'var(--text-dark, #1D1D1D)'}
                  height={'30px'}
                >
                  <Text color={'gray.500'} fontSize={'14px'}>
                    Nama Pembeli
                  </Text>
                </Button>
                <Button
                  borderRadius={'50px'}
                  bg={'white'}
                  border={'1px solid var(--gray-300, #D5D5D5)'}
                  height={'30px'}
                >
                  <Text fontSize={'14px'} color={'gray.500'}>
                    Nama Produk
                  </Text>
                </Button>
                <Button
                  borderRadius={'50px'}
                  bg={'white'}
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
                  height={'150px'}
                  color={'gray.500'}
                  placeholder="Tuliskan Pesanmu"
                ></Textarea>
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
                onClick={onClose}
                height={'40px'}
                width={'103px'}
                colorScheme="blue"
                borderRadius={'50px'}
              >
                Simpan
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}

export default TemplateMessage;
