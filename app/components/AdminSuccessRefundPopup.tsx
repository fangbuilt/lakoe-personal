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
import moment from 'moment';
import React from 'react';

import { LuZoomIn } from 'react-icons/lu';
import { AdminRefundNotification } from '~/modules/DashboardMailerlite/mailerliteAdminRefund';

export default function AdminSuccessRefundPopup(props: any) {
  const { dataRefund } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const transferFee = 10000;
  const tax = (parseInt(dataRefund.amount) * 1) / 100;
  const formattedAmount = formatRupiah(parseInt(dataRefund.amount));
  const withdarwalTotal = formatRupiah(
    parseInt(dataRefund.amount) - transferFee - tax
  );

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
                  Nomor Penarikan: <Text fontWeight={700}>{dataRefund.id}</Text>
                </Text>
                <Text>
                  {moment(dataRefund.createdAt, 'YYYY-MM-DD HH:mm:ss').format(
                    'LLLL'
                  )}
                </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'10px'}>
                <Box>
                  <Text fontWeight={700}>
                    {dataRefund.invoice.receiverName}
                  </Text>
                  <Text fontSize={'12px'}>
                    {dataRefund.invoice.receiverEmail}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>
                    {dataRefund.invoice.receiverPhone}
                  </Text>
                </Box>
              </Flex>

              <Box mt={'10px'} fontSize={'12px'}>
                <Text fontWeight={700}>Informasi Bank</Text>
                <Flex>
                  <Text width={'150px'}>Nama Bank</Text>
                  <Text>: {dataRefund.invoice.payment.bank}</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nomor Rekening</Text>
                  <Text>: {dataRefund.invoice.payment.accountNumber}</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nama Pemilik</Text>
                  <Text>: {dataRefund.invoice.receiverName}</Text>
                </Flex>
              </Box>

              <Box mt={'10px'} fontSize={'12px'}>
                <Text fontWeight={700}>Rincian</Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Jumlah Penarikan</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> {formattedAmount}</Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Admin</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text>{tax} </Text>
                </Flex>
                <Text fontSize={'10px'} color={'grey'}>
                  *1% jumlah penarikan
                </Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Transfer</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> {formatRupiah(transferFee)}</Text>
                </Flex>
                <Divider my={'5px'} py={'1px'} bg={'grey'} />
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Saldo yang diterima</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> {withdarwalTotal}</Text>
                </Flex>
              </Box>

              <Box mt={'10px'}>
                {/* <Text fontWeight={700}>Bukti Transfer</Text>
                <Box
                  mt={"10px"}
                  width={"100px"}
                  height={"100px"}
                  border={"1px solid gray"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Link
                    to={
                      "https://media.karousell.com/media/photos/products/2022/9/14/bukti_transfer_1663144577_a652da3c.jpg"
                    }
                    target="_blank"
                  >
                    <Text fontWeight={"700"} color={"teal"}>
                      Lihat Gambar
                    </Text>
                  </Link>
                </Box> */}

                <Button
                  width={'100%'}
                  textAlign={'center'}
                  mt={'10px'}
                  fontSize={'12px'}
                  colorScheme="teal"
                  padding={0}
                  onClick={() => {
                    AdminRefundNotification();

                    onClose();
                  }}
                >
                  Send email to Seller
                </Button>
              </Box>

              {/* <Box mt={'10px'}>
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
              </Box> */}
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
