import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import {
  BsCreditCard2FrontFill,
  BsFillCalendarDateFill,
  BsDownload,
} from 'react-icons/bs';
import { PiWarningCircleFill, PiWarningCircleBold } from 'react-icons/pi';
import { MdArrowDropDownCircle, MdCreditScore } from 'react-icons/md';
import { ChevronDownIcon } from '@chakra-ui/icons';
import DashboardPopup from '~/components/PopupDashboard';
import { getBankList } from '~/modules/dashboard/dashboard.service';
import { useLoaderData } from '@remix-run/react';
import NavbarDashboard from './navbarDashboard';

export async function loader() {
  return await getBankList();
}

export default function Dashboard() {
  const dataBank = useLoaderData<typeof loader>();

  return (
    <>
      <NavbarDashboard />
      <Box bg={'#f2f5f7'} p={4}>
        <Box p={3}>
          <Text fontWeight={'bold'} fontSize={'18px'} mb={5} color={'#656565'}>
            Credit Dashboard
          </Text>
          <SimpleGrid minChildWidth={'250px'} spacing={'7'}>
            <Box
              display={'flex'}
              boxShadow={'md'}
              h={'130px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Text fontSize={'13px'}>Current Balance</Text>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                Rp.0
              </Text>
              {/* <Button
                // onClick={() => setButtonPopup(true)}
                onClick={(onOpen) => BasicUsage()}
                bg={"#8dc63f"}
                color={"white"}
                _hover={{ bg: "blue.500" }}
              >
                Tarik Credit
              </Button> */}
              <DashboardPopup dataBank={dataBank} />
            </Box>
            <Box
              display={'flex'}
              h={'130px'}
              boxShadow={'md'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={4}
            >
              <Text fontSize={'30px'} color={'#34bfa3'}>
                <BsCreditCard2FrontFill />
              </Text>
              <Text fontSize={'13px'}>Penarikan sedang dalam proses</Text>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#656565'}>
                Rp.0
              </Text>
            </Box>
            <Box
              display={'flex'}
              h={'130px'}
              boxShadow={'md'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={4}
            >
              <Text fontSize={'30px'} color={'#34bfa3'}>
                <BsCreditCard2FrontFill />
              </Text>
              <Flex justifyContent={'space-between'}>
                <Flex alignItems={'center'}>
                  <Text fontSize={'13px'} mr={1}>
                    Saldo Tertahan{' '}
                  </Text>
                  <PiWarningCircleFill />
                </Flex>
                <Box>
                  <Text
                    fontSize={'13px'}
                    mr={1}
                    color={'blue.600'}
                    fontWeight={'bold'}
                  >
                    Lihat Semua
                  </Text>
                </Box>
              </Flex>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#656565'}>
                Rp.0
              </Text>
            </Box>
            <Box
              display={'flex'}
              h={'130px'}
              boxShadow={'md'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={4}
            >
              <Text fontSize={'30px'} color={'#34bfa3'}>
                <BsCreditCard2FrontFill />
              </Text>
              <Flex justifyContent={'space-between'}>
                <Text fontSize={'13px'} mr={1}>
                  Tagihan Belum Dibayar{' '}
                </Text>
                <Box>
                  <Text
                    fontSize={'13px'}
                    mr={1}
                    color={'blue.600'}
                    fontWeight={'bold'}
                  >
                    Lihat Semua
                  </Text>
                </Box>
              </Flex>
              <Text fontSize={'20px'} fontWeight={'bold'} color={'#ed1c24'}>
                Rp.0
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
        <Box
          bg={'white'}
          boxShadow={'md'}
          m={'22px 10px'}
          p={'40px 15px'}
          pt={3}
          borderRadius={10}
        >
          <Flex justifyContent={'space-between'} alignItems={'center'}>
            <Text
              fontWeight={'bold'}
              fontSize={'18px'}
              mb={5}
              color={'#656565'}
            >
              Report Period
            </Text>
            <Button
              display={'flex'}
              flexDirection={'row'}
              borderRadius={20}
              border={'1px solid'}
              bg={'white'}
            >
              <Text fontSize={'15px'} color={'#00579e'}>
                <BsFillCalendarDateFill />
              </Text>
              <Text fontSize={'13px'} m={1} color={'gray.600'}>
                30 Hari Terakhir
              </Text>
              <Text fontSize={'17px'} color={'#00579e'}>
                <MdArrowDropDownCircle />
              </Text>
            </Button>
          </Flex>
          <SimpleGrid minChildWidth={'250px'} spacing={'7'}>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Penarikan Selesai</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Pendapatan COD</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Cashback Pengiriman</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Pendapatan E-Payment</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Refund Biaya Pengiriman</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Kredit Lainnya</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Klaim Pengiriman</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              justifyContent={'center'}
              display={'flex'}
              boxShadow={'md'}
              h={'90px'}
              bg={'white'}
              borderRadius={'10'}
              flexDirection={'column'}
              gap={2}
              p={3}
            >
              <Flex gap={3}>
                <Box fontSize={'30px'} color={'#34bfa3'}>
                  <MdCreditScore />
                </Box>
                <Flex direction={'column'}>
                  <Text fontSize={'13px'}>Pembayaran Penagiagan</Text>
                  <Text fontSize={'20px'} fontWeight={'bold'} color={'#28a745'}>
                    Rp.0
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </SimpleGrid>
        </Box>

        <SimpleGrid minChildWidth={'400px'}>
          <Flex justifyContent={'space-between'} p={3}>
            <Menu>
              <MenuButton
                as={Button}
                bg={'white'}
                border={'1px solid'}
                color={'#656565'}
                fontSize={'13px'}
                borderColor={'gray.400'}
                leftIcon={<BsDownload />}
                rightIcon={<ChevronDownIcon />}
              >
                Ekpor
              </MenuButton>
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </Menu>
            <Flex gap={5}>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={'white'}
                  border={'1px solid'}
                  color={'#656565'}
                  fontSize={'13px'}
                  borderColor={'gray.400'}
                  rightIcon={<ChevronDownIcon />}
                >
                  All Type
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={'white'}
                  border={'1px solid'}
                  color={'#656565'}
                  fontSize={'13px'}
                  borderColor={'gray.400'}
                  rightIcon={<ChevronDownIcon />}
                >
                  All Status
                </MenuButton>
                <MenuList>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Create a Copy</MenuItem>
                  <MenuItem>Mark as Draft</MenuItem>
                  <MenuItem>Delete</MenuItem>
                  <MenuItem>Attend a Workshop</MenuItem>
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton
                  as={Button}
                  bg={'white'}
                  border={'1px solid'}
                  color={'gray.400'}
                  fontSize={'13px'}
                  borderColor={'gray.400'}
                >
                  Order ID
                </MenuButton>
              </Menu>
            </Flex>
          </Flex>
        </SimpleGrid>

        <SimpleGrid p={3}>
          <Box
            display="flex"
            borderRadius={5}
            bg={'white'}
            border={'1px solid'}
            color={'gray.500'}
            fontSize={'13px'}
            borderColor={'gray.400'}
            justifyContent={'space-between'}
            p={2}
          >
            <Text fontWeight={'bold'}>No.</Text>
            <Text fontWeight={'bold'}>Deskripsi</Text>
            <Text fontWeight={'bold'}>Nilai</Text>
            <Text fontWeight={'bold'}>Status</Text>
            <Text fontWeight={'bold'}>Tipe</Text>
            <Text fontWeight={'bold'}>Tanggal</Text>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            borderRadius={5}
            bg={'white'}
            border={'1px solid'}
            color={'#28a745'}
            fontSize={'13px'}
            borderColor={'gray.400'}
            mt={3}
            h={'250px'}
          >
            <Flex alignItems={'center'}>
              <PiWarningCircleBold />
              <Text> Tidak ada aktivitas dalam rentan tanggal ini</Text>
            </Flex>
          </Box>
        </SimpleGrid>

        {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={'white'}
            mt={5}
          >
            <Stack
              spacing={4}
              w={'full'}
              maxW={'md'}
              bg={'white'}
              rounded={'xl'}
              p={0}
              my={12}
            >
              <Box
                borderLeft={'2px solid'}
                borderColor={'blue.700'}
                bg={'blue.100'}
                padding={'10px'}
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
              <FormControl id="email" isRequired>
                <FormLabel>Berapa banyak yang ingin anda tarik?</FormLabel>
                <Input
                  placeholder=""
                  _placeholder={{ color: 'gray.500' }}
                  type="email"
                />
                <Text fontStyle="italic" color="blue">
                  Jumlah Maksimal: Rp0
                </Text>
              </FormControl>
              <FormControl id="" isRequired>
                <FormLabel>Tarik ke:</FormLabel>
                <Accordion allowToggle>
                  <AccordionItem>
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
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Silakan masukkan kata sandi akun Anda"
                  _placeholder={{ color: 'gray.500' }}
                  type="password"
                />
              </FormControl>
              <Stack spacing={6}>
                <Flex justifyContent={'end'} gap={3}>
                  <Button
                    onClick={() => setButtonPopup(false)}
                    border={'1px solid'}
                    borderColor={'gray.600'}
                    bg={'white'}
                    color={'gray.600'}
                    _hover={{
                      bg: 'green.400',
                      color: 'white',
                      borderStyle: 'none',
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500',
                    }}
                  >
                    Submit
                  </Button>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
        </Popup> */}
      </Box>
    </>
  );
}
