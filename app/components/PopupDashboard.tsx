import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import TarikKredit from './PopupTarikKredit';

export default function DashboardPopup({ dataBank }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showTarikKredit, setShowTarikKredit] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const toggleTarikKredit = () => {
    setShowTarikKredit(!showTarikKredit);
  };

  return (
    <>
      <Button onClick={onOpen} bg={'#8dc63f'} color={'#fff'} colorScheme="none">
        Tarik Credit
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
            <Box
              borderLeft={'2px solid'}
              borderColor={'blue.700'}
              bg={'blue.100'}
              padding={'10px'}
              fontSize={'13px'}
            >
              <UnorderedList>
                <ListItem>Withdraw hanya dapat dilakukan 1x per hari</ListItem>
                <ListItem>
                  Dan akan diproses pada hari kerja pada jam 09:00 - 17:00 WIB
                </ListItem>
                <ListItem>
                  Direkomendasikan Withdraw ke Rekening BCA, selain rekening BCA
                  akan memakan waktu 2-3 hari kerja
                </ListItem>
              </UnorderedList>
            </Box>

            <FormControl mt={4}>
              <FormLabel>Berapa banyak yang ingin anda tarik?</FormLabel>
              <Input ref={initialRef} placeholder="amount" name="amount" />
              <Text fontStyle={'italic'} color={'blue.500'} fontSize={'13px'}>
                Jumlah Maksimal:{' '}
                <Text as="span" fontWeight={700}>
                  Rp.2.500.000
                </Text>
              </Text>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tarik Ke:</FormLabel>
              <select>
                {dataBank.map((data: any) => (
                  <option
                    value={`${data.bank} - ${data.accountName} - ${data.accountNumber}`}
                    key={data.id}
                  >
                    {data.bank} - {data.accountName} - {data.accountNumber}
                  </option>
                ))}
              </select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Silakan masukkan kata sandi akun anda"
                type="password"
              />
            </FormControl>
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
            <div>
              <Button colorScheme="green" mr={3} onClick={toggleTarikKredit}>
                Next
              </Button>
              {showTarikKredit && <TarikKredit />}
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
