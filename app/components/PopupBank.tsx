import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import React from 'react';
import { BsBank } from 'react-icons/bs';
import { SelectBankOption } from './selectBankOption';

export default function PopupBank() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        bg={'#03559c'}
        color={'#fff'}
        colorScheme="none"
        fontSize={'13px'}
        letterSpacing={1}
      >
        + Tambah No. Rekening
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Form method="post">
            <Input type="hidden" name="actionType" value="create" />
            <ModalHeader display={'flex'} alignItems={'center'}>
              <BsBank /> <Text ml={'5px'}>Informasi Bank </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormLabel>Bank</FormLabel>
              <SelectBankOption />

              <FormControl mt={4}>
                <FormLabel>Atas Nama</FormLabel>
                <Input
                  type="text"
                  ref={initialRef}
                  placeholder="Nama Pemilik Rekening"
                  name="accountName"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input
                  type="number"
                  placeholder="123456789"
                  name="accountNumber"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" colorScheme="blue" mr={3} onClick={onClose}>
                Tambah Akun Bank
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
