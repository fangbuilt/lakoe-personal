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
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react';
import React from 'react';
// import { BsBank } from "react-icons/bs";

export default function DashboardPopup() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

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
            <Text ml={'5px'}>Tarik Credit </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Box
              borderLeft={'2px solid'}
              borderColor={'blue.700'}
              bg={'blue.100'}
              padding={'10px'}
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
              <Input ref={initialRef} placeholder="jumlah penarikan" />
              <Text fontStyle={'italic'} color={'blue.500'}>
                Jumlah Maksimal:{' '}
                <Text as="span" fontWeight={700}>
                  50
                </Text>
              </Text>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Tarik Ke:</FormLabel>
              <Accordion allowToggle>
                <AccordionItem borderRadius={'10px'} width={'100%'}>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        Pilih Rekening Bank untuk menerima penarikan
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={0}>
                    <Button colorScheme="none" color={'gray.600'}>
                      BRI
                    </Button>
                  </AccordionPanel>
                  <AccordionPanel pb={0}>
                    <Button colorScheme="none" color={'gray.600'}>
                      BCA
                    </Button>
                  </AccordionPanel>
                  <AccordionPanel pb={0}>
                    <Button colorScheme="none" color={'gray.600'}>
                      MANDIRI
                    </Button>
                  </AccordionPanel>
                  <AccordionPanel pb={0}>
                    <Button colorScheme="none" color={'gray.600'}>
                      BNI
                    </Button>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Silakan masukkan kata sandi akun anda"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Nomor Rekening</FormLabel>
              <Input placeholder="123456789k" />
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
            <Button colorScheme="green" mr={3}>
              Tarik Credit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
