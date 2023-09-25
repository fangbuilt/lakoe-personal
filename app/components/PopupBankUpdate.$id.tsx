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
import { BiEditAlt } from 'react-icons/bi';
import { SelectBankOptionUpdate } from './selectBankOption';

export default function UpdateBank(props: any) {
  const { id } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button
        onClick={onOpen}
        color={'gray.700'}
        bg={'white'}
        fontSize={'18px'}
      >
        <BiEditAlt />
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
            <Input type="hidden" name="actionType" value="update" />
            <Input type="hidden" name="bankId" value={id} />
            <ModalHeader display={'flex'} alignItems={'center'}>
              <BsBank /> <Text ml={'5px'}>Update Informasi Bank </Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Bank</FormLabel>
                <SelectBankOptionUpdate />
                <FormControl mt={4}>
                  <FormLabel>Atas Nama</FormLabel>
                  <Input
                    type="text"
                    ref={initialRef}
                    placeholder="Nama Pemilik Rekening"
                    name="updateAccountName"
                  />
                </FormControl>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Nomor Rekening</FormLabel>
                <Input
                  type="number"
                  placeholder="123456789"
                  name="updateAccountNumber"
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button
                name="_action"
                type="submit"
                colorScheme="blue"
                mr={3}
                onClick={onClose}
              >
                Update Akun Bank
              </Button>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
