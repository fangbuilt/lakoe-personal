import {
  Box,
  Button,
  Card,
  Flex,
  Img,
  // Accordion,
  // AccordionButton,
  // AccordionIcon,
  // AccordionItem,
  // AccordionPanel,
  // Modal,
  // ModalBody,
  // ModalCloseButton,
  // ModalContent,
  // ModalFooter,
  // ModalHeader,
  // ModalOverlay,
  // useDisclosure,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Checkbox,
  Center,
} from '@chakra-ui/react';
// import { Form, Link } from '@remix-run/react';
import SearchProduct from '../assets/icon-pack/search-product.svg';
import { useFilterCourier } from '~/hooks/useFilterCourier';
import { useSortFilter } from '~/hooks/useSortFilter';
import ChevronDownIcon from '../assets/icon-pack/arrow-dropdown.svg';
import Empty from '../assets/icon-pack/empty-dot.svg';
import ReceiptSearch from '../assets/icon-pack/receipt-search.svg';

// import {  useLoaderData } from '@remix-run/react';
import UseSearchProductUnpaid from '~/hooks/useSearchOrderUnpaid';
// import type { loader } from '~/routes/order';
import { useState } from 'react';
import ModalWhatsapp from './modalProps/modalWhatsapp';

export default function UnpaidCard() {
  const { filteredOrder, setSearchQuery } = UseSearchProductUnpaid();
  const { getSelectedCourier, selectedCouriers, toggleCourier } =
    useFilterCourier();

  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortFilter();
  // const { getTemplateMessages } = useLoaderData<typeof loader>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [, setSelectedCardId] = useState<string>('');
  const openModal = () => {
    setModalIsOpen(true);
  };

  // const [datafilter, setDataFilter] = useState('');

  // const orderFilter = queryString.parse(location.search).order;
  // const courierArrayFilter = queryString.parse(location.search).courier;
  // const sortFilter = queryString.parse(location.search).sort;
  // useEffect(() => {
  //   const handleDataaa = async () => { // Gunakan async/await untuk menangani permintaan Axios
  //     try {
  //       const response = await axios.get(`http://localhost:3000/order?order=${orderFilter}&courier=${courierArrayFilter}&sort=${sortFilter}`);
  //       setDataFilter(response.data); // Set data yang diterima dari respons ke state
  //       console.log('datassh', response.data); // Cetak data ke konsol setelah respons diterima
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  //   handleDataaa()
  // },[orderFilter, courierArrayFilter, sortFilter])

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}

      <Box width={'100%'} display={'flex'} justifyContent={'center'}>
        <Box
          display={'flex'}
          w={'47%'}
          bg={'white'}
          px={'3'}
          gap={2}
          justifyContent={'space-between'}
          zIndex={10}
          position={'fixed'}
          top={'52'}
          mt={2}
        >
          <InputGroup bg={'white'}>
            <InputLeftElement pointerEvents="none">
              <Image src={SearchProduct} />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Cari Pesanan"
              _placeholder={{
                opacity: 1,
                color: '#909090',
                fontSize: '14px',
              }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              variant="outline"
              bgColor={'white'}
              fontSize={'14px'}
              width={'100%'}
              color={getSelectedCourier() > 0 ? 'black' : '#909090'}
              fontWeight={'normal'}
              // me={2}
            >
              <Text fontSize="14px" textAlign="left">
                {getSelectedCourier() > 0
                  ? `${getSelectedCourier()} Kurir terpilih`
                  : 'Semua Kurir'}
              </Text>

              <Image
                src={ChevronDownIcon}
                position={'absolute'}
                fontSize={'2px'}
                right={2}
                top={3}
              />
            </MenuButton>

            <MenuList>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('GoSend')}
                  isChecked={selectedCouriers.includes('GoSend')}
                >
                  GoSend
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('GrabExpress')}
                  isChecked={selectedCouriers.includes('GrabExpress')}
                >
                  GrabExpress
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('AnterAja')}
                  isChecked={selectedCouriers.includes('AnterAja')}
                >
                  AnterAja
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('JNE')}
                  isChecked={selectedCouriers.includes('JNE')}
                >
                  JNE
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('J&T')}
                  isChecked={selectedCouriers.includes('J&T')}
                >
                  J&T
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('Lion Parcel')}
                  isChecked={selectedCouriers.includes('Lion Parcel')}
                >
                  Lion Parcel
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('Ninja Xpress')}
                  isChecked={selectedCouriers.includes('Ninja Xpress')}
                >
                  Ninja Xpress
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => toggleCourier('Pos Indonesia')}
                  isChecked={selectedCouriers.includes('Pos Indonesia')}
                >
                  Pos Indonesia
                </Checkbox>
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              w={'100%'}
              variant="outline"
              bgColor={'white'}
              // me={2}
            >
              <Image
                src={ChevronDownIcon}
                position={'absolute'}
                fontSize={'2px'}
                right={2}
                top={3}
              />
              <Text
                fontSize={'14px'}
                textAlign={'left'}
                fontWeight={'normal'}
                color={'black'}
              >
                {getSelectedSortOption() ? (
                  getSelectedSortOption()
                ) : (
                  <Text color={'#909090'}>Urutkan</Text>
                )}
              </Text>
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => setSortOption('Semua')}
                className={selectedSortOption === 'Semua' ? 'active' : ''}
              >
                Semua
                <Image
                  src={Empty}
                  ml={'auto'}
                  display={
                    selectedSortOption === 'Semua' ? 'inline-block' : 'none'
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption('Paling Baru')}
                className={selectedSortOption === 'Paling Baru' ? 'active' : ''}
              >
                Paling Baru
                <Image
                  src={Empty}
                  ml={'auto'}
                  display={
                    selectedSortOption === 'Paling Baru'
                      ? 'inline-block'
                      : 'none'
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption('Paling Lama')}
                className={selectedSortOption === 'Paling Lama' ? 'active' : ''}
              >
                Paling Lama
                <Image
                  src={Empty}
                  ml={'auto'}
                  display={
                    selectedSortOption === 'Paling Lama'
                      ? 'inline-block'
                      : 'none'
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption('Respon Tercepat')}
                className={
                  selectedSortOption === 'Respon Tercepat' ? 'active' : ''
                }
              >
                Respon Tercepat
                <Image
                  src={Empty}
                  ml={'auto'}
                  display={
                    selectedSortOption === 'Respon Tercepat'
                      ? 'inline-block'
                      : 'none'
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption('Respon Terlama')}
                className={
                  selectedSortOption === 'Respon Terlama' ? 'active' : ''
                }
              >
                Respon Terlama
                <Image
                  src={Empty}
                  ml={'auto'}
                  display={
                    selectedSortOption === 'Respon Terlama'
                      ? 'inline-block'
                      : 'none'
                  }
                />
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      {/* CARD START HERE */}
      {filteredOrder.length === 0 ? (
        <Box marginTop={'70px'}>
          <Center>
            <Box textAlign="center" mt={5} display={'flex'}>
              <Image src={ReceiptSearch} />
              <Text fontSize="16px" mt={1}>
                Oops, pesanan yang kamu cari tidak ditemukan.
                <Text fontSize={'12px'} color={'#909090'} textAlign={'left'}>
                  Coba bisa cari dengan kata kunci lain
                </Text>
              </Text>
            </Box>
          </Center>
        </Box>
      ) : (
        <Box>
          {filteredOrder.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <Card mb={5} boxShadow={'xs'}>
              <Box key={index}>
                <Box mt={5}>
                  <Box>
                    <Flex justifyContent={'space-between'} px={2}>
                      <Button
                        bg={'#E8C600'}
                        color={'white'}
                        textShadow={'1px 1px 1px gray'}
                        fontWeight={'bold'}
                        colorScheme="red.500"
                        size={'sm'}
                        pointerEvents={'none'}
                      >
                        {item.status === 'UNPAID'
                          ? 'Belom Dibayar'
                          : 'Belum Dibayar'}
                      </Button>

                      {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                      <Button
                        bg={'transparent'}
                        border={'1px solid #D5D5D5'}
                        borderRadius={'full'}
                        fontSize={'14px'}
                        onClick={() => {
                          setSelectedCardId(item.id);
                          openModal();
                        }}
                      >
                        Hubungi Pembeli
                      </Button>
                      <ModalWhatsapp
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        selectedCardId={'rCFV2hRPtZp7E7VLoRvge7b2'}
                        itemName={item.receiverName}
                        itemPhone={item.receiverPhone}
                      />
                      {/*  */}
                    </Flex>
                    <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                      {item.invoiceNumber}
                    </Text>
                    <hr />
                    <Flex justifyContent={'space-between'}>
                      <Box display={'flex'} w={'80%'}>
                        <Img
                          w={'52px'}
                          h={'52px'}
                          display={'inline'}
                          src={`${item.cart?.cartItems.map((item) =>
                            item.product?.attachments.map((item) => item.url)
                          )}`}
                          mt={3}
                        />
                        <Text
                          mt={4}
                          id="fm500"
                          fontSize={'16px'}
                          textOverflow={'ellipsis'}
                          overflow={'hidden'}
                          whiteSpace={'nowrap'}
                          fontWeight={'700'}
                        >
                          {item.cart?.cartItems.map(
                            (item) => item.product?.name
                          )}
                          <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                            {item.cart?.cartItems.map((item) => item.qty)}{' '}
                            Barang
                          </Text>
                        </Text>
                      </Box>
                      <Box mt={4} w={'15%'}>
                        <Flex gap={1}>
                          <Text color={'#909090'} fontSize={'14px'}>
                            Total
                          </Text>
                          <Text color={'#909090'} fontSize={'14px'}>
                            Belanja
                          </Text>
                        </Flex>
                        <Text fontWeight={'bold'} fontSize={'14px'}>
                          {/* {formatter.format(item.price)}
                           */}
                          Rp {item.price.toLocaleString('id-ID')}
                        </Text>
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
        </Box>
      )}
      {/* END CARD */}
    </>
  );
}
