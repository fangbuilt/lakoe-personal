import {
  Box,
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';

import { LuZoomIn } from 'react-icons/lu';

export default function PreviewWithdraw(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen} bg={'#8dc63f'} color={'#fff'} colorScheme="none">
        <LuZoomIn />
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pt={6} pb={2}>
            <Box bg={'yellow.300'} padding={'10px'} fontSize={'13px'}>
              <Box>
                <Text display={'flex'}>
                  Nomor Penarikan: <Text fontWeight={700}>123ASD</Text>
                </Text>
                <Text>Dibuat 6 September 2023 pukul 15:45 </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'15px'}>
                <Box>
                  <Text fontWeight={700}>Adira Salahudi</Text>
                  <Text fontSize={'12px'}>Dumbways Store</Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>Status: Request</Text>
                </Box>
              </Flex>

              <Box mt={'20px'} fontSize={'12px'}>
                <Text fontWeight={700}>Informasi Bank</Text>
                <Flex>
                  <Text width={'150px'}>Nama Bank</Text>
                  <Text>: BNI</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nomor Rekening</Text>
                  <Text>: 0460541966</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nama Pemilik</Text>
                  <Text>: Adira Salahudi</Text>
                </Flex>
                <Button
                  width={'100%'}
                  textAlign={'center'}
                  mt={'10px'}
                  fontSize={'12px'}
                  colorScheme="teal"
                  padding={0}
                >
                  Check
                </Button>
              </Box>

              <Box mt={'20px'} fontSize={'12px'}>
                <Text fontWeight={700}>Rincian</Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Jumlah Penarikan</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 1.000.000</Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Admin</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 10.000</Text>
                </Flex>
                <Text fontSize={'10px'} color={'grey'}>
                  *1% jumlah penarikan
                </Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Transfer</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 10.000</Text>
                </Flex>
                <Divider my={'5px'} py={'1px'} bg={'grey'} />
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Saldo yang diterima</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> Rp. 980.000</Text>
                </Flex>

                <Flex gap={'5px'} mt={'15px'}>
                  <Button
                    flex={'50%'}
                    fontSize={'12px'}
                    colorScheme="teal"
                    padding={0}
                  >
                    Approved
                  </Button>
                  <Button
                    flex={'50%'}
                    fontSize={'12px'}
                    colorScheme="teal"
                    padding={0}
                  >
                    Declined
                  </Button>
                </Flex>
              </Box>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={onClose}
              color={'white'}
              border={'1px solid'}
              borderColor={'gray.500'}
              fontSize={'12px'}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
