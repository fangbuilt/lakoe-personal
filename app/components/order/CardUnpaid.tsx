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
  Divider,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useSortFilter } from '~/hooks/useSortFilter';
import ChevronDownIcon from '../../assets/icon-pack/arrow-dropdown.svg';
import Empty from '../../assets/icon-pack/empty-dot.svg';
import ReceiptSearch from '../../assets/icon-pack/receipt-search.svg';
import SearchProduct from '../../assets/icon-pack/search-product.svg';

import UseSearchProductUnpaid from '~/hooks/useSearchOrderUnpaid';
// import { useState } from 'react';
import ModalWhatsapp from '../modalProps/modalWhatsapp';
import { useState } from 'react';

export default function UnpaidCard() {
  const {
    getSelectedCourier,
    filteredOrder,
    setSearchQuery,
    searchQuery,
    selectedCouriers,
    handleCourierCheckboxChange,
  } = UseSearchProductUnpaid();

  console.log(searchQuery);
  const {
    selectedSortOption,
    setSortOption,
    getSelectedSortOption,
    sortOrders,
  } = useSortFilter(); // sort selcted
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const sortedOrders = sortOrders(filteredOrder);
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  if (selectedSortOption === 'Paling Baru') {
    sortedOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB.getTime() - dateA.getTime();
    });
  } else if (selectedSortOption === 'Paling Lama') {
    sortedOrders.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime();
    });
  }
  return (
    <>
      {/* start filter */}
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
              // value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
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
                  onChange={() => handleCourierCheckboxChange('lion parcel')}
                  checked={selectedCouriers.includes('lion parcel')}
                >
                  Lion Parcel
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('grabexpress')}
                  isChecked={selectedCouriers.includes('grabexpress')}
                >
                  GrabExpress
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('anteraja')}
                  isChecked={selectedCouriers.includes('anteraja')}
                >
                  AnterAja
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('jne')}
                  isChecked={selectedCouriers.includes('jne')}
                >
                  JNE
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('jnt')}
                  isChecked={selectedCouriers.includes('jnt')}
                >
                  J&T
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('tiki')}
                  isChecked={selectedCouriers.includes('tiki')}
                >
                  Tiki
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('ninjaexpress')}
                  isChecked={selectedCouriers.includes('ninjaexpress')}
                >
                  Ninja Xpress
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() => handleCourierCheckboxChange('pos indonesia')}
                  isChecked={selectedCouriers.includes('pos indonesia')}
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
          {sortedOrders.map((data, index) => (
            <Card mb={5} mt={5} boxShadow={'xs'} key={index}>
              <Box>
                <Box>
                  <Box>
                    <Flex justifyContent={'space-between'} px={3} py={2}>
                      <Button
                        bg={'#E8C600'}
                        colorScheme="#E8C600"
                        color={'white'}
                        fontWeight={'bold'}
                        size={'sm'}
                        pointerEvents={'none'}
                        height={'24px'}
                      >
                        {data.status === 'UNPAID' ? 'Belom Dibayar' : ''}
                      </Button>

                      {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}

                      <Button
                        bg={'transparent'}
                        border={'1px solid #D5D5D5'}
                        borderRadius={'full'}
                        fontSize={'14px'}
                        height={'32px'}
                        py={1}
                        size={'sm'}
                        px={3}
                        fontWeight={'600'}
                        onClick={() => {
                          openModal();
                        }}
                      >
                        Hubungi Pembeli
                      </Button>
                      <ModalWhatsapp
                        isOpen={modalIsOpen}
                        onClose={closeModal}
                        selectedCardId={'rCFV2hRPtZp7E7VLoRvge7b2'}
                        itemName={data.receiverName}
                        itemPhone={data.receiverPhone}
                      />
                    </Flex>
                    <Text
                      mb={1}
                      fontSize={'14px'}
                      mt={-3}
                      color={'#909090'}
                      px={3}
                    >
                      INV/{data.invoiceNumber}
                    </Text>
                    <Divider />

                    <Link to={`detail/${data.id}`}>
                      <Flex justifyContent={'space-between'} px={3}>
                        <Box display={'flex'} gap={3} w={'80%'}>
                          <Img
                            w={'52px'}
                            h={'52px'}
                            display={'inline'}
                            borderRadius={'md'}
                            src={`${data.cart?.cartItems[0]?.product?.attachments.map(
                              (item: any) => item.url
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
                            {data.cart?.cartItems.map(
                              (item: any) => item.product?.name
                            )}
                            <Text
                              color={'gray.400'}
                              pb={3}
                              fontWeight={'normal'}
                            >
                              {data.cart?.cartItems.map(
                                (item: any) => item.qty
                              )}{' '}
                              Barang
                            </Text>
                          </Text>
                        </Box>
                        <Box mt={4} w={'18%'}>
                          <Flex gap={1} fontWeight={'500'}>
                            <Text color={'#909090'} fontSize={'14px'}>
                              Total
                            </Text>
                            <Text color={'#909090'} fontSize={'14px'}>
                              Belanja
                            </Text>
                          </Flex>
                          <Text fontWeight={'bold'} fontSize={'14px'}>
                            Rp {data.price.toLocaleString('id-ID')}
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
          {/* ))} */}
        </Box>
      )}
    </>
  );
}
