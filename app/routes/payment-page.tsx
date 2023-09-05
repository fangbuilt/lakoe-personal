import {
  Box,
  Button,
  Center,
  Heading,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useClipboard,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import React from 'react';
import data from '../tests/utils/dummy.json';

export default function BackdropExample() {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );
  const price = data.map((item) => item.price);
  const tagPrice = data.map((item) => item.tagPrice);
  const { onCopy, hasCopied } = useClipboard(`${price} ${tagPrice}`);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  return (
    <>
      <Center mt={'20px'}>
        <Button
          onClick={() => {
            setOverlay(<OverlayOne />);
            onOpen();
          }}
        >
          Konfirmasi Pembayaran
        </Button>
      </Center>

      <Modal size={'4xl'} isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <Center>
            {data.map((item, id) => (
              <Box boxSize={'3xl'} key={id}>
                <Heading fontSize={'2xl'} mt={'16'} textAlign={'center'}>
                  Terimakasih Sudah Melakukan Order {item.titleProduct} di Lakoe
                </Heading>
                <Text textAlign={'center'} mt={'24px'}>
                  Untuk menyelesaikan proses order, silahkan transfer sejumlah
                </Text>
                <Center textAlign={'center'} mt={'24px'} color={'green.400'}>
                  <Heading>Rp{item.price}.</Heading>
                  <Heading color={'orange.400'}>{item.tagPrice}</Heading>
                </Center>
                <Center mt={3}>
                  <Text
                    display={'flex'}
                    bg={'yellow.400'}
                    fontWeight={'bold'}
                    gap={2}
                    p={'8px'}
                    borderRadius={5}
                  >
                    Penting!
                    <Text fontWeight={'normal'}>
                      Mohon Trtansfer sesuai sampai dengan 3 digit karakter
                    </Text>
                  </Text>
                </Center>
                <Text textAlign={'center'} mt={5}>
                  <Button border={'1px'} onClick={onCopy}>
                    {hasCopied ? 'Berhasil Disalin !' : 'Salin Jumlah'}
                  </Button>
                  <Text mt={5}>ke bank berikut ini ya kak:</Text>
                  <Box lineHeight={'9'}>
                    <Text>Rek. {item.payment} </Text>
                    <Text>{item.noPayment}</Text>
                    <Text>A.n {item.accountName}</Text>
                  </Box>
                  <Text mt={'20px'}>
                    Konfirmasikan Pembayaran Anda di:
                    <Link to={'/'}>
                      <Text display={'inline'} color={'blue'} ms={1}>
                        Konfirmasi Pembayaran
                      </Text>
                    </Link>
                  </Text>
                </Text>
              </Box>
            ))}
          </Center>

          <ModalCloseButton bg={'gray.100'} fontWeight={'bold'} />

          <ModalFooter display={'block'}>
            <Center>
              <Text display={'flex'}>
                Powered By
                {/* <Shopping /> */}
                Lakoe. <Text color={'cyan.400'}> id</Text>
              </Text>
            </Center>
            <Box w={'100%'} h={'30px'} bg={'cyan.400'}></Box>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
