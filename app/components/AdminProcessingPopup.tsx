import {
  Box,
  Button,
  Center,
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
  Image,
} from '@chakra-ui/react';
import { Form } from '@remix-run/react';
import moment from 'moment';
import type { ChangeEvent } from 'react';
import React, { useState } from 'react';

import { LuZoomIn } from 'react-icons/lu';
import { updateStatusWithdraw } from '~/modules/dashboard/dashboard.service';
import LoadingAttachmentAdmin from './loadingAttachmentLoading';

export default function AdminProcessingPopup(props: any) {
  const { withdrawalData } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [statusUpdated, setStatusUpdated] = useState(withdrawalData.status);
  const [selectImage, setSelectImage] = useState<string | undefined | null>(
    null
  );
  const [alertImage, setAlertImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertValidation, setIsAlertValidation] = useState(true);

  const handleImageAlert = () => {
    setIsAlertValidation(false);
    setIsLoading(true);

    setTimeout(() => {
      setAlertImage('Successful upload attachment proof✅');
      setIsLoading(false);
    }, 3000);

    setTimeout(() => {
      setIsAlertValidation(true);
    }, 8000);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target) {
          setSelectImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const transferFee = 10000;
  const tax = (parseInt(withdrawalData.amount) * 1) / 100;
  const formattedAmount = formatRupiah(parseInt(withdrawalData.amount));
  const withdarwalTotal = formatRupiah(
    parseInt(withdrawalData.amount) - transferFee - tax
  );

  const handleApproveClick = async () => {
    try {
      setIsLoading(true);
      await updateStatusWithdraw(withdrawalData.id, 'PROCESSING');
      setStatusUpdated('PROCESSING');
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 7000);
    }
  };

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
                  Nomor Penarikan:{' '}
                  <Text fontWeight={700}>{withdrawalData.id}</Text>
                </Text>
                <Text>
                  {moment(
                    withdrawalData.createdAt,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('LLLL')}{' '}
                </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'10px'}>
                <Box>
                  <Text fontWeight={700}>
                    {withdrawalData.bankAccount.accountName}
                  </Text>
                  <Text fontSize={'12px'}>{withdrawalData.store?.name}</Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>{statusUpdated}</Text>
                </Box>
              </Flex>

              <Box mt={'10px'} fontSize={'12px'}>
                <Text fontWeight={700}>Informasi Bank</Text>
                <Flex>
                  <Text width={'150px'}>Nama Bank</Text>
                  <Text>: {withdrawalData.bankAccount.bank}</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nomor Rekening</Text>
                  <Text>: {withdrawalData.bankAccount.accountNumber}</Text>
                </Flex>
                <Flex>
                  <Text width={'150px'}>Nama Pemilik</Text>
                  <Text>: {withdrawalData.bankAccount.accountName}</Text>
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
                  <Text> {formatRupiah(tax)}</Text>
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
              <Box>
                <Form method="post" encType="multipart/form-data">
                  {/* <Input type="hidden" name="actionType" value="create" /> */}
                  <Input
                    type="hidden"
                    name="withdrawId"
                    value={withdrawalData.id}
                  />
                  <Text fontWeight={700}>Bukti Transfer</Text>

                  {!isAlertValidation && (
                    <>
                      {isLoading && <LoadingAttachmentAdmin />}
                      <Text
                        color={'white'}
                        fontSize={'13px'}
                        mt={'1'}
                        bg={'green.500'}
                        p={1}
                        borderRadius={7}
                      >
                        {alertImage}
                      </Text>
                    </>
                  )}

                  <Box mt={'2px'}>
                    <Input
                      type="file"
                      name="img"
                      id="img"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </Box>
                  {selectImage && (
                    <Center>
                      <Box p={4}>
                        <Image src={selectImage}></Image>
                      </Box>
                    </Center>
                  )}
                  <Button
                    width={'100%'}
                    textAlign={'center'}
                    mt={'10px'}
                    fontSize={'12px'}
                    colorScheme="teal"
                    padding={0}
                    type="submit"
                    onClick={handleImageAlert}
                  >
                    upload
                  </Button>
                </Form>
              </Box>

              <Form method="patch">
                {/* <Input type="hidden" name="actionType" value="update" /> */}
                <Input type="hidden" name="id" value={withdrawalData.id} />
                <Box mt={'10px'}>
                  <Button
                    width={'100%'}
                    textAlign={'center'}
                    mt={'10px'}
                    fontSize={'12px'}
                    colorScheme="teal"
                    padding={0}
                    onClick={handleApproveClick}
                    name="status"
                    value="SUCCESS"
                    type="submit"
                  >
                    Selesai
                  </Button>
                  <Box mt={5} mb={0}>
                    {isLoading && <LoadingAttachmentAdmin />}
                  </Box>
                </Box>
              </Form>
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
