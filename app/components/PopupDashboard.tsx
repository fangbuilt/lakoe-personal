import {
  Alert,
  Box,
  Button,
  Center,
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
  Image,
  AlertTitle,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import TarikKredit from './PopupTarikKredit';
import { redirect } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';

export default function DashboardPopup({ dataBank }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showTarikKredit, setShowTarikKredit] = useState(false);

  // Alert
  // const [showAlert, setShowAlert] = useState(false);
  // const [alertMessage, setAlertMessage] = useState("");
  // const [amountFilled, setAmountFilled] = useState(false);
  // const [bankAccountFilled, setBankAccountFilled] = useState(false);
  // const [passwordFilled, setPasswordFilled] = useState(false);

  // const [amountAlert, setAmountAlert] = useState<string>("");
  // const [bankAccountAlert, setBankAccountAlert] = useState<string>("");
  // const [passwordAlert, setPasswordAlert] = useState<string>("");

  // const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value;
  //   setAmountAlert(text);
  //   setAmountFilled(!!text);
  // };
  // const handleBankAccountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value;
  //   setBankAccountAlert(text);
  //   setBankAccountFilled(!!text);
  // };
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const text = e.target.value;
  //   setPasswordAlert(text);
  //   setPasswordFilled(!!text);
  // };

  // const handleSaveClick = async () => {
  //   if (amountFilled && bankAccountFilled && passwordFilled) {
  //     setShowAlert(true);
  //     setAlertMessage("Data harus diisi semua");
  //     setTimeout(() => {
  //       setShowAlert(false);
  //     }, 3000);
  //   }
  // };

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [formData, setFormData] = useState({
    actionType: 'create',
    amount: '',
    bankAccount: '',
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleTarikKredit = () => {
    const { actionType, amount, bankAccount } = formData;
    console.log(
      'ini data-data inputan withdraw',
      actionType,
      amount,
      bankAccount
    );
    setShowTarikKredit(!showTarikKredit);
  };

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
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <Form method="post">
            <Input type="hidden" name="actionType" value="create" />
            {/* <Input type="text" name="withdrawId" /> */}
            {/* <Input type="text" name="storeId" /> */}
            {/* <Input type="text" name="approvedById" /> */}
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

              <FormControl mt={4}>
                <FormLabel>Berapa banyak yang ingin anda tarik?</FormLabel>
                <Input
                  value={formData.amount}
                  // onChange={(event) => {
                  //   handleChange(event);
                  //   handleAmountChange(event);
                  // }}
                  onChange={handleChange}
                  type="number"
                  ref={initialRef}
                  placeholder="Jumlah penarikan"
                  name="amount"
                />
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
                <FormLabel>Tarik Ke:</FormLabel>
                {dataBank === null ? (
                  <button onClick={handleAddRekeningClick}>Add Rekening</button>
                ) : (
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
                    <option value="">Select Your Bank Account</option>
                    {dataBank.map((data: any) => (
                      <option
                        value={`${data.bank} - ${data.accountName} - ${data.accountNumber}`}
                        key={data.id}
                      >
                        {`${data.bank} - ${data.accountName} - ${data.accountNumber}`}
                      </option>
                    ))}
                  </Select>
                )}
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
                  onChange={handlePasswordChange}
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
                  colorScheme="green"
                  mr={3}
                  onClick={() => {
                    toggleTarikKredit();
                    handleSaveClick();
                  }}
                  type="submit"
                >
                  Tarik Kredit
                </Button>
                {showTarikKredit && (
                  <TarikKredit
                    amount={formData.amount}
                    bankAccount={formData.bankAccount}
                  />
                )}{' '}
                {/* Conditionally render TarikKredit */}
              </div>
            </ModalFooter>
          </Form>
        </ModalContent>
      </Modal>
      {showAlert && (
        <Center>
          <Alert
            justifyContent={'space-between'}
            w={'30%'}
            color="white"
            status={
              amountFilled && bankAccountFilled && passwordFilled
                ? 'success'
                : 'error'
            }
            variant={'subtle'}
            borderRadius={'10px'}
            bg={'blackAlpha.800'}
            position={'fixed'}
            top={'5px'}
            py={0}
            px={3}
          >
            <Image
              sizes="10px"
              me={2}
              src={
                amountFilled && bankAccountFilled && passwordFilled
                  ? 'xx'
                  : 'yy'
              }
            />
            <AlertTitle fontWeight={'normal'} fontSize={'13px'}>
              {alertMessage}
            </AlertTitle>
            <Button
              fontSize={'13px'}
              colorScheme="none"
              onClick={() => setShowAlert(false)}
            >
              Oke
            </Button>
          </Alert>
        </Center>
      )}
    </>
  );
}
