import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import moment from 'moment';
import React, { useState } from 'react';
import { AdminDeclinedNotification } from '~/modules/DashboardMailerlite/mailerliteAdminDeclined';

export default function AdminDeclinedPopup(props: any) {
  const { dataWithdrawal } = props;
  const [formData, setFormData] = useState({
    actionType: 'create',
    withdrawId: dataWithdrawal.id || '',
    storeId: dataWithdrawal.store?.id || '',
    bankAccountId: dataWithdrawal.bankAccount?.id || '',
    reason: '',
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
  const tax = (parseInt(dataWithdrawal.amount) * 1) / 100;
  const formattedAmount = formatRupiah(parseInt(dataWithdrawal.amount));
  const withdarwalTotal = formatRupiah(
    parseInt(dataWithdrawal.amount) - transferFee - tax
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
          Declined
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
                  <Text fontWeight={700}>{dataWithdrawal.id}</Text>
                </Text>
                <Text>
                  {moment(
                    dataWithdrawal.createdAt,
                    'YYYY-MM-DD HH:mm:ss'
                  ).format('LLLL')}{' '}
                </Text>
              </Box>

              <Flex justifyContent={'space-between'} mt={'10px'}>
                <Box>
                  <Text fontWeight={700}>
                    {dataWithdrawal.bankAccount.accountName}
                  </Text>
                  <Text fontSize={'12px'}>{dataWithdrawal.store?.name}</Text>
                </Box>
                <Box>
                  <Text fontSize={'12px'}>{dataWithdrawal.status}</Text>
                </Box>
              </Flex>

              <Box mt={'10px'} fontSize={'12px'}>
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
              </Box>

              <Box mt={'10px'} fontSize={'12px'}>
                <Text fontWeight={700}>Rincian</Text>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Jumlah Penarikan</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text>{formattedAmount}</Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                  <Flex>
                    <Text width={'150px'}>Biaya Admin</Text>
                    <Text>:</Text>
                  </Flex>
                  <Text> {tax}</Text>
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
                <form method="post">
                  <FormControl>
                    <Input type="hidden" name="actionType" value="create" />
                    <Input
                      type="text"
                      name="withdrawId"
                      value={formData.withdrawId}
                      hidden
                    />
                    <Input
                      type="text"
                      name="storeId"
                      value={formData.storeId}
                      hidden
                    />
                    <Input
                      type="text"
                      name="bankAccountId"
                      value={formData.bankAccountId}
                      hidden
                    />
                    <FormLabel fontSize="12px" fontWeight={700}>
                      Alasan Penolakan
                    </FormLabel>
                    <Input
                      placeholder="Reason of declined..."
                      type="text"
                      name="reason"
                      fontSize="10px"
                      onChange={handleChange}
                      value={formData.reason}
                    />
                  </FormControl>
                  <Button
                    type="submit"
                    fontSize="12px"
                    colorScheme="teal"
                    width="100%"
                    textAlign="center"
                    mt="10px"
                    onClick={() => {
                      AdminDeclinedNotification(formData.reason);
                      onClose();
                    }}
                  >
                    Send email to Seller
                  </Button>
                </form>
              </Box>

              {/* <Box mt={"10px"}>
                <Text fontWeight={700}>Riwayat</Text>
                <UnorderedList>
                  <ListItem>
                    Permintaan ditolak oleh Admin A{" "}
                    <ListItem ml={"20px"}>
                      {moment(
                        dataWithdrawal.updatedAt,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("LLLL")}{" "}
                    </ListItem>
                  </ListItem>

                  <ListItem>
                    Permintaan dibuat{" "}
                    <ListItem ml={"20px"}>
                      {moment(
                        dataWithdrawal.createdAt,
                        "YYYY-MM-DD HH:mm:ss"
                      ).format("LLLL")}{" "}
                    </ListItem>
                  </ListItem>
                </UnorderedList>
              </Box> */}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              type="submit"
              colorScheme="teal"
              mr={3}
              onClick={onClose}
              color={'white'}
              border={'1px solid'}
              borderColor={'gray.500'}
              fontSize={'12px'}
            >
              Selesai
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
