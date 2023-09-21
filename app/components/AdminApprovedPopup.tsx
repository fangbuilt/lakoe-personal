import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import moment from 'moment';
import React, { useState } from 'react';

import { LuZoomIn } from 'react-icons/lu';
import { updateStatusWithdraw } from '~/modules/dashboard/dashboard.service';

export default function AdminApprovedPopup(props: any) {
  const { dataWithdrawal } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statusUpdated, setStatusUpdated] = useState(dataWithdrawal.status);

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const transferFee = 10000;
  const tax = (parseInt(dataWithdrawal.amount) * 1) / 100;
  const formattedAmount = formatRupiah(parseInt(dataWithdrawal.amount));
  const withdarwalTotal = formatRupiah(
    parseInt(dataWithdrawal.amount) - transferFee - tax
  );

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const openModal = () => {
    onOpen();
  };

  const handleApproveClick = async () => {
    try {
      // Make an API call to update the status
      await updateStatusWithdraw(dataWithdrawal.id, 'PROCESSING');
      // Update the local status
      setStatusUpdated('PROCESSING');
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <>
      <Flex justifyContent={'center'}>
        <Text
          onClick={openModal}
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
            <Box padding={'10px'} fontSize={'13px'}>
              <Box>
                <Text display={'flex'}>
                  Nomor Penarikan:{' '}
                  <Text fontWeight={700}>{dataWithdrawal.id}</Text>
                </Text>
                <Text>
                  {moment(
                    dataWithdrawal.createdAt,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('LLLL')}
                </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'10px'}>
                <Box>
                  <Text fontWeight={700}>
                    {dataWithdrawal.bankAccount.accountName}
                  </Text>
                  <Text fontSize={'12px'}>{dataWithdrawal.store.name}</Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>{statusUpdated}</Text>
                </Box>
              </Flex>

              <Box mt={'20px'} fontSize={'12px'}>
                <Text fontWeight={700}>Informasi Bank</Text>
                <Flex>
                  <Text width={'150px'}>Nama Bank</Text>
                  <Text>: {dataWithdrawal.bankAccount.bank}</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nomor Rekening</Text>
                  <Text>: {dataWithdrawal.bankAccount.accountNumber}</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nama Pemilik</Text>
                  <Text>: {dataWithdrawal.bankAccount.accountName}</Text>
                </Flex>
                {/* <Button
                  width={"100%"}
                  textAlign={"center"}
                  mt={"10px"}
                  fontSize={"12px"}
                  colorScheme="teal"
                  padding={0}
                >
                  Check
                </Button> */}
              </Box>

              <Box mt={'20px'} fontSize={'12px'}>
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
                  <Text>{tax}</Text>
                </Flex>
                <Text fontSize={'10px'} color={'grey'}>
                  *1% jumlah penarikan
                </Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Transfer</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text>{formatRupiah(transferFee)}</Text>
                </Flex>
                <Divider my={'5px'} py={'1px'} bg={'grey'} />
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Saldo yang diterima</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text>{withdarwalTotal}</Text>
                </Flex>
                <Form method="post">
                  <Input type="hidden" name="actionType" value="update" />
                  <Input type="hidden" name="id" value={dataWithdrawal.id} />
                  <Flex gap={'5px'} mt={'10px'}>
                    <Button
                      name="status"
                      value="PROCESSING"
                      flex={'100%'}
                      fontSize={'12px'}
                      colorScheme="teal"
                      padding={0}
                      type="submit"
                      onClick={handleApproveClick}
                    >
                      Processing
                    </Button>
                    {/* <Button
                      name="status"
                      value="DECLINED"
                      flex={'50%'}
                      fontSize={'12px'}
                      colorScheme="teal"
                      padding={0}
                      type="submit"
                      onClick={handleApproveClick}
                    >
                      Declined
                    </Button> */}
                  </Flex>
                </Form>
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
