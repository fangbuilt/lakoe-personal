import {
  Box,
  Button,
  Divider,
  Flex,
  ListItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import React from 'react';

import { LuZoomIn } from 'react-icons/lu';

export default function AdminSuccessPopup(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Flex justifyContent={'center'}>
        <Text
          onClick={onOpen}
          cursor={'pointer'}
          color={'white'}
          bg={'teal'}
          padding={'5px 15px'}
          borderRadius={'15px'}
        >
          <LuZoomIn />
        </Text>
      </Flex>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody pt={6} pb={2}>
            <Box
              padding={'10px'}
              fontSize={'13px'}
              my={'10px'}
              mx={'10px'}
              borderRadius={'10px'}
              boxShadow="base"
              p="6"
              rounded="md"
              bg="white"
            >
              <Box>
                <Text display={'flex'}>
                  Nomor Penarikan: <Text fontWeight={700}>123ASD</Text>
                </Text>
                <Text>Dibuat 6 September 2023 pukul 15:45 </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'10px'}>
                <Box>
                  <Text fontWeight={700}>Adira Salahudi</Text>
                  <Text fontSize={'12px'}>Dumbways Store</Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>Status: Succes</Text>
                </Box>
              </Flex>

              <Box mt={'10px'} fontSize={'12px'}>
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
              </Box>

              <Box mt={'10px'} fontSize={'12px'}>
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
              </Box>

              <Box mt={'10px'}>
                <Text fontWeight={700}>Bukti Transfer</Text>
                <Box
                  mt={'10px'}
                  width={'100px'}
                  height={'100px'}
                  border={'1px solid gray'}
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Link
                    to={
                      'https://media.istockphoto.com/id/1488332977/photo/wooden-deck-at-the-seaside.webp?b=1&s=170667a&w=0&k=20&c=R47Apouxt_juv7WNuTpnnc3GGd4R5yf05uCwEY7YhNA='
                    }
                  >
                    <Text fontWeight={'700'} color={'teal'}>
                      Lihat Gambar
                    </Text>
                  </Link>
                </Box>

                <Button
                  width={'100%'}
                  textAlign={'center'}
                  mt={'10px'}
                  fontSize={'12px'}
                  colorScheme="teal"
                  padding={0}
                  onClick={onClose}
                >
                  Selesai
                </Button>
              </Box>

              <Box mt={'10px'}>
                <Text fontWeight={700}>Riwayat</Text>
                <UnorderedList>
                  <ListItem>
                    Penarikan diproses/diselesaikan oleh...
                    <ListItem ml={'20px'}>
                      6 September 2023 pukul 15:05
                    </ListItem>
                  </ListItem>

                  <ListItem>
                    Permintaan disetujui oleh Admin A
                    <ListItem ml={'20px'}>
                      6 September 2023 pukul 15:00
                    </ListItem>
                  </ListItem>

                  <ListItem>
                    Permintaan dibuat
                    <ListItem ml={'20px'}>
                      6 September 2023 pukul 14:55
                    </ListItem>
                  </ListItem>
                </UnorderedList>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
