import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

export default function TarikKredit(props: any) {
  const { amount, bankAccount } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  return (
    <>
      <Button onClick={onOpen} bg={'#8dc63f'} color={'#fff'} colorScheme="none">
        Check
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={'flex'} alignItems={'center'}>
            <Text ml={'5px'}>Tarik Credit</Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box bg={'yellow.300'} padding={'10px'} fontSize={'13px'}>
              {/* {dataWithdraw.map((item: any) => ( */}
              <Box textAlign={'center'}>
                <Text>Anda melakukan penarikan sebesar</Text>
                <Text fontSize={'20px'} fontWeight={'bold'} color={'gray.700'}>
                  Rp.{amount}
                </Text>
                <Text>Ke Nomor Rekening :</Text>
                <Text fontSize={'20px'} fontWeight={'bold'} color={'gray.700'}>
                  {bankAccount}
                </Text>
                <Text>Mohon tunggu beberapa saat..</Text>
                <Text>Terima Kasih!</Text>
              </Box>
              {/* ))} */}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="none"
              mr={3}
              onClick={onClose}
              color={'gray.500'}
              border={'1px solid'}
              borderColor={'gray.500'}
            >
              Batal
            </Button>
            <Button colorScheme="green" mr={3}>
              Oke
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
