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
  Select,
  Text,
  UnorderedList,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { WithdrawNotification } from '~/modules/DashboardMailerlite/dashboardMailerlite';

export default function DashboardPopup({ bankAccount }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showTarikKredit, setShowTarikKredit] = useState(false);

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  // alert
  const [alertMessage, setAlertMessage] = useState('');
  const [isFormValidation, setIsFormValidation] = useState(true);

  const [alertAmountMessage, setAlertAmountMessage] = useState('');

  const [formData, setFormData] = useState({
    actionType: 'create',
    bankId: '',
    amount: '',
    bankAccount: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAmount = () => {
    const { amount } = formData;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount)) {
      setAlertAmountMessage('Amount harus berupa angka');
    } else if (parsedAmount < 0) {
      setAlertAmountMessage('Anda memasukkan jumlah kurang dari 0');
    } else if (parsedAmount > 2500000) {
      setAlertAmountMessage('Jumlah amount melebihi batas maksimal');
    } else {
      setAlertAmountMessage('');
    }
  };

  const toggleTarikKredit = () => {
    const { actionType, amount, bankAccount, bankId } = formData;

    if (!amount || !bankAccount) {
      setIsFormValidation(false);
      setAlertMessage('Mohon lengkapi data di bawah!');
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
      bankAccount
    );
  };

  function formatRupiah(amount: number) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount);
  }

  const amount = formData.amount;
  const formattedAmount = formatRupiah(parseInt(amount as string));

  const handleAddRekeningClick = () => {
    return redirect('/bank');
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
        onClose={() => {
          setIsFormValidation(true);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <Form method="post">
            <Input type="hidden" name="actionType" value="create" />
            {/* <Input type="text" name="bankId" value={id} /> */}
            {/* <Input type="text" name="storeId" /> */}
            {/* <Input type="text" name="approvedById" /> */}
            <ModalHeader display={'flex'} alignItems={'center'}>
              <Text ml={'5px'}>Tarik Credit</Text>
              {/* <Text ml={"5px"}>{createdWithdrawId}</Text> */}
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
                <FormLabel>Berapa banyak yang ingin anda tarik?</FormLabel>
                <Input
                  value={formData.amount}
                  // onChange={(event) => {
                  //   handleChange(event);
                  //   handleAmountChange(event);
                  // }}
                  onChange={(event) => {
                    handleChange(event);
                    handleAmount(); // Call handleAmount when the input changes
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
                  <Text as="span" fontWeight={700}>
                    Rp.2.500.000
                  </Text>
                </Text>
              </FormControl>

              <FormControl mt={4}>
                {/* <FormLabel>Tarik Ke:</FormLabel> */}
                {/* {data === null ? ( */}
                <button onClick={handleAddRekeningClick}>Tarik ke:</button>
                {/* : ( */}
                <Select
                  fontSize={'13px'}
                  name="bankId"
                  onChange={handleChange}
                  value={formData.bankId}
                  // onChange={(event) => {
                  //   handleChange(event);
                  //   handleBankAccountChange(event);
                  // }}
                >
                  <option value={formData.bankId}>
                    Select Your Bank Account
                  </option>
                  {bankAccount.map((dataBank: any) => (
                    <option
                      value={`${dataBank.id}`}
                      key={dataBank.id}
                    >{`${dataBank.id}`}</option>
                  ))}
                </Select>
                <Select
                  fontSize={'13px'}
                  name="bankAccount"
                  onChange={handleChange}
                  value={formData.bankAccount}
                  // onChange={(event) => {
                  //   handleChange(event);
                  //   handleBankAccountChange(event);
                  // }}
                >
                  <option value={formData.bankId}>
                    Select Your Bank Account
                  </option>
                  {bankAccount.map((dataBank: any) => (
                    <option
                      value={`${dataBank.bank} - ${dataBank.accountName} - ${dataBank.accountNumber}`}
                      key={dataBank.id}
                    >
                      {`${dataBank.bank} - ${dataBank.accountName} - ${dataBank.accountNumber}`}
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
                <FormLabel>Password</FormLabel>
                <Input
                  // onChange={(event) => {
                  //   handleChange(event);
                  //   handlePasswordChange(event);
                  // }}
                  // onChange={handlePasswordChange}
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
              <div>
                <Button
                  type="submit"
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    toggleTarikKredit();
                    handleAmount();
                  }}
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
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <Box
                          bg={'yellow.300'}
                          padding={'10px'}
                          fontSize={'13px'}
                        >
                          {/* {dataWithdraw.map((item: any) => ( */}
                          <Box textAlign={'center'}>
                            <Text>Anda melakukan penarikan sebesar</Text>
                            <Text
                              fontSize={'20px'}
                              fontWeight={'bold'}
                              color={'gray.700'}
                            >
                              {formattedAmount}
                            </Text>
                            <Text>Ke Nomor Rekening :</Text>
                            <Text
                              fontSize={'20px'}
                              fontWeight={'bold'}
                              color={'gray.700'}
                            >
                              {formData.bankAccount}
                            </Text>
                            <Text>Mohon tunggu beberapa saat..</Text>
                            <Text>Terima Kasih!</Text>
                            <Text>ini bank id: {formData.bankId}</Text>
                          </Box>
                          {/* ))} */}
                        </Box>
                      </ModalBody>
                      <ModalFooter>
                        {/* <Form method="post">
                            <Input
                              type="hidden"
                              name="actionType"
                              value="delete"
                            /> */}
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
                          mr={3}
                          onClick={() => {
                            WithdrawNotification(
                              formattedAmount,
                              formData.bankAccount
                            );
                            onClose();
                          }}
                        >
                          Withdraw
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                )}{' '}
              </div>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
}
