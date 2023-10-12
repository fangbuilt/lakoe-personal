import {
  Box,
  Button,
  Divider,
  Flex,
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
  Select,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { WithdrawNotification } from '~/modules/DashboardMailerlite/dashboardMailerlite';
import moment from 'moment';

export default function DashboardPopup({ data }: any) {
  const [selectedBankAccount, setSelectedBankAccount] = useState<string>('');

  useEffect(() => {
    // Initialize selected bank account if needed
    if (data && data.length > 0) {
      setSelectedBankAccount(data[0].id);
    }
  }, [data]);
  console.log('select bank', selectedBankAccount);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showTarikKredit, setShowTarikKredit] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // alert
  const [alertMessage, setAlertMessage] = useState('');
  const [isFormValidation, setIsFormValidation] = useState(true);

  const [alertAmountMessage, setAlertAmountMessage] = useState('');
  const [alertBankMessage, setAlertBankMessage] = useState('');

  const createWithdrawal = moment(
    data?.createdAt,
    'YYYY-MM-DD HH:mm:ss'
  ).format('LLLL');

  const [formData, setFormData] = useState({
    actionType: 'create',
    bankId: '',
    amount: '',
    bankAccount: '',
    password: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmount = () => {
    const { amount } = formData;
    const parsedAmount = parseFloat(amount);
    const parsedCredit = parseFloat(String(Number(data?.credit) / 10));

    if (isNaN(parsedAmount)) {
      setIsFormValidation(false);
      setAlertAmountMessage('Amount harus berupa angka');
      setAlertMessage('Amount harus berupa angka');
    } else if (parsedAmount < 10000) {
      setIsFormValidation(false);
      setAlertAmountMessage('Penarikan minimal Rp.100.000');
      setAlertMessage('Penarikan minimal Rp.100.000');
    } else if (parsedAmount > 2500000) {
      setIsFormValidation(false);
      setAlertAmountMessage('Jumlah amount melebihi batas maksimal');
      setAlertMessage('Jumlah amount melebihi batas maksimal');
    } else if (parsedAmount > parsedCredit) {
      setIsFormValidation(false);
      setAlertAmountMessage('Saldo Anda tidak mencukupi!');
      setAlertMessage('Saldo Anda tidak mencukupi!');
    } else {
      setIsFormValidation(true);
      setAlertAmountMessage('');
    }
  };

  const toggleTarikKredit = () => {
    const { actionType, amount, bankAccount, bankId } = formData;

    if (!amount || !bankAccount || !bankId) {
      setIsFormValidation(false);
      setAlertMessage('Mohon lengkapi data di bawah!');
      setTimeout(() => {
        setIsFormValidation(true);
      }, 5000);
    } else if (bankAccount.split(' - ')[0] !== bankId) {
      setIsFormValidation(false);
      setAlertBankMessage('Konfirmasi Bank tidak sinkron.');
      setTimeout(() => {
        setIsFormValidation(true);
      }, 5000);
    } else {
      setIsFormValidation(true);
      setShowTarikKredit(!showTarikKredit);
    }
    console.log(
      'ini data-data inputan withdraw',
      actionType,
      bankId,
      amount,
      bankAccount.split(' - ')[0]
    );
  };

  const splitBankAccount = formData.bankAccount.split(' - ');
  const accountName = splitBankAccount[2];
  const bankName = splitBankAccount[1];
  const accountNumber = splitBankAccount[3];
  const bankAccountPreview = splitBankAccount.slice(1, 4).join(' - ');

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const amount = formData.amount;
  const transferFee = 10000;
  const tax = (parseInt(amount) * 1) / 100;
  const formattedAmount = formatRupiah(parseInt(amount));
  const withdarwalTotal = formatRupiah(parseInt(amount) - transferFee - tax);

  const handleAddRekeningClick = () => {
    return redirect('/bank');
  };

  return (
    <>
      <Button
        onClick={onOpen}
        bgColor={'lakoeCyan'}
        color={'#fff'}
        colorScheme="none"
      >
        Tarik Credit
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => {
          setIsFormValidation(true);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <Form method="post">
            <Input type="hidden" name="actionType" value="create" />

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
                  <ListItem>
                    Withdraw hanya dapat dilakukan 1x per hari
                  </ListItem>
                  <ListItem>
                    Dan akan diproses pada hari kerja pada jam 09:00 - 17:00 WIB
                  </ListItem>
                  <ListItem>
                    Direkomendasikan Withdraw ke Rekening BCA, selain rekening
                    BCA akan memakan waktu 2-3 hari kerja
                  </ListItem>
                </UnorderedList>
              </Box>
              {!isFormValidation && (
                <Text
                  bg="red.400"
                  p={1}
                  mt={3}
                  color={'white'}
                  fontSize="14px"
                  fontStyle="italic"
                >
                  {alertMessage}
                </Text>
              )}

              <FormControl mt={4}>
                <FormLabel
                  fontSize={'14px'}
                  fontWeight={'bold'}
                  color="gray.500"
                >
                  Berapa banyak yang ingin anda tarik?
                </FormLabel>
                <Input
                  fontSize={'13px'}
                  value={formData.amount}
                  onChange={(event) => {
                    handleChange(event);
                    handleAmount();
                  }}
                  type="number"
                  ref={initialRef}
                  placeholder="Jumlah penarikan"
                  name="amount"
                />
                <Text color={'red.600'} fontSize={'13px'} mt={'1'}>
                  {alertAmountMessage}
                </Text>
                <Text
                  // fontStyle={"italic"}
                  color={'blue.500'}
                  fontSize={'13px'}
                  mt={'1'}
                >
                  Max amount:{''}
                  <Text as="span" fontWeight={700} fontSize={'13px'}>
                    Rp.2.500.000
                  </Text>
                </Text>
              </FormControl>

              <FormControl mt={4}>
                <Text
                  onClick={handleAddRekeningClick}
                  fontSize={'14px'}
                  fontWeight={'bold'}
                  color="gray.500"
                >
                  Tarik ke:
                </Text>
                {/* : ( */}

                <Select
                  fontSize={'13px'}
                  name="bankId"
                  onChange={handleChange}
                  value={formData.bankId}
                >
                  <option value="">Select Bank Account</option>
                  {data.map((dataBank: any) => (
                    <option value={`${dataBank.id}`} key={dataBank.id}>
                      {`${dataBank.accountName} - ${dataBank.bank} - ${dataBank.accountNumber}`}
                    </option>
                  ))}
                </Select>
                {/* )} */}
                <Link to={'/bank'}>
                  <Text
                    fontSize={'13px'}
                    color={'blue.500'}
                    // fontStyle={"italic"}
                    mt={'1'}
                  >
                    didn't have bank account?
                  </Text>
                </Link>
              </FormControl>
              <FormControl mt={4}>
                <FormLabel
                  fontSize={'14px'}
                  fontWeight={'bold'}
                  color="gray.500"
                >
                  Konfirmasi Bank Account*
                </FormLabel>
                <Select
                  fontSize={'13px'}
                  name="bankAccount"
                  onChange={handleChange}
                  value={formData.bankAccount}
                >
                  <option value="">Confirm Your Bank Account</option>
                  {data.map((dataBank: any) => (
                    <option
                      key={dataBank.id}
                      value={`${dataBank.id} - ${dataBank.bank} - ${dataBank.accountName} - ${dataBank.accountNumber}`}
                    >
                      {`${dataBank.accountName} - ${dataBank.bank} - ${dataBank.accountNumber}`}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <Text color={'red.600'} fontSize={'13px'} mt={'1'}>
                {alertBankMessage}
              </Text>

              <FormControl mt={4}>
                <FormLabel
                  fontSize={'14px'}
                  fontWeight={'bold'}
                  color="gray.500"
                >
                  Password*
                </FormLabel>
                <Input
                  fontSize={'13px'}
                  type="password"
                  ref={initialRef}
                  placeholder="Silakan masukkan kata sandi akun anda"
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
              <Box>
                <Button
                  type="submit"
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    toggleTarikKredit();
                    handleAmount();
                  }}
                  // isDisabled={!isFormValidation}
                >
                  Tarik Kredit
                </Button>
                {showTarikKredit && (
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
                      <ModalCloseButton mr={2} />
                      <ModalBody pt={0} pb={1}>
                        <Box
                          borderRadius={7}
                          bg={'blue.100'}
                          padding={3}
                          fontSize={'13px'}
                        >
                          <Box>
                            <Text display={'flex'}>
                              Nomor Penarikan:{' '}
                              <Text fontWeight={700}>123ASD</Text>
                            </Text>
                            <Text>{createWithdrawal}</Text>
                          </Box>

                          <Flex justifyContent={'space-between'} mt={'15px'}>
                            <Box>
                              <Text fontWeight={700}>{accountName}</Text>
                              <Text fontSize={'12px'}>{data?.store?.name}</Text>
                            </Box>
                            <Box>
                              <Text fontSize={'12px'}>Status: Request</Text>
                            </Box>
                          </Flex>

                          <Box mt={'20px'} fontSize={'12px'}>
                            <Text fontWeight={700}>Informasi Bank</Text>
                            <Flex>
                              <Text width={'150px'}>Nama Bank</Text>
                              <Text>: {bankName}</Text>
                            </Flex>
                            <Flex>
                              <Text width={'150px'}>Nomor Rekening</Text>
                              <Text>: {accountNumber}</Text>
                            </Flex>
                            <Flex>
                              <Text width={'150px'}>Nama Pemilik</Text>
                              <Text>: {accountName}</Text>
                            </Flex>
                          </Box>

                          <Box mt={'20px'} fontSize={'12px'}>
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
                              <Text>{formatRupiah(tax)}</Text>
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
                              <Text>{withdarwalTotal}</Text>
                            </Flex>
                          </Box>
                        </Box>
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
                        {/* </Form> */}
                        <Button
                          type="submit"
                          colorScheme="green"
                          mr={0}
                          onClick={() => {
                            WithdrawNotification(
                              formattedAmount,
                              bankAccountPreview,
                              accountName
                            );

                            onClose();
                          }}
                        >
                          Oke
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                )}{' '}
              </Box>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
