/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  Center,
  Checkbox,
  Flex,
  Img,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Image,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

import Empty from '../../assets/icon-pack/empty-dot.svg';
import ChevronDownIcon from '../../assets/icon-pack/arrow-dropdown.svg';
import SearchProduct from '../../assets/icon-pack/search-product.svg';
import { Link, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import ReceiptSearch from '../../assets/icon-pack/receipt-search.svg';
import UseFilterNewOrder from '../../modules/order/hooks/useFilterCanceled';
import NewOrderHooks from '~/modules/webhook/hooks/NewOrderHooks';
import type { loader } from '~/routes/order';
import { useSortFilter } from '~/hooks/useSortFilter';

export function formatCurrency(price: number): string {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedAmount;
}

interface ModalInterface {
  isOpen: boolean;
  onClose: () => void;
  modalText: string;
  onConfirm: () => void;
}

export function ModalComponent(props: ModalInterface) {
  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Proses Pesanan</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontWeight="bold" mb="1rem">
            {props.modalText}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={props.onClose}>
            Cancel
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
          >
            Selesai di Packing
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default function CardNewOrderBa() {
  const {
    getSelectedCourier,
    filteredOrder,
    setSearchQuery,
    selectedCouriers,
    handleCourierCheckboxChange,
  } = UseFilterNewOrder();

  const {
    selectedSortOption,
    setSortOption,
    getSelectedSortOption,
    sortOrders,
  } = useSortFilter(); // sort selcted
  const sortedOrders = sortOrders(filteredOrder);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cardProduct = useLoaderData<typeof loader>();
  const { setSelectedProps, afterpacking } = NewOrderHooks();

  const props = cardProduct.dataInvoice;

  const [modalText, setModalText] = useState('');
  return (
    <>
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
                  onChange={() => handleCourierCheckboxChange('ShopeeExpress')}
                  isChecked={selectedCouriers.includes('ShopeeExpress')}
                >
                  Shopee Express
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                  onChange={() =>
                    handleCourierCheckboxChange('tokopediaExpress')
                  }
                  isChecked={selectedCouriers.includes('tokopediaExpress')}
                >
                  Tokopedia Express
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
          {sortedOrders &&
            props.map((props) => (
              <Card mb={5} boxShadow={'xs'}>
                <Box>
                  <Box mt={5}>
                    <Box>
                      <Flex justifyContent={'space-between'} px={2}>
                        <Button
                          bg={'#008F5D'}
                          color={'white'}
                          fontWeight={'bold'}
                          colorScheme="red.500"
                          size={'sm'}
                          pointerEvents={'none'}
                        >
                          Pesanan Baru
                        </Button>

                        {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                        <Button
                          bg={'transparent'}
                          border={'1px solid #D5D5D5'}
                          borderRadius={'full'}
                          fontSize={'14px'}
                          onClick={() => {
                            setModalText(
                              'Apakah sudah di pack dan siap dikirim?'
                            );
                            setSelectedProps(props); //biarin error...
                            onOpen();
                          }}
                        >
                          Proses Pesanan
                        </Button>
                        {/*  */}
                        {/* Modal */}
                        <ModalComponent
                          isOpen={isOpen}
                          onClose={onClose}
                          modalText={modalText}
                          onConfirm={afterpacking}
                        />
                      </Flex>
                      <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                        {props.invoiceNumber}
                      </Text>
                      <hr />
                      <Flex justifyContent={'space-between'}>
                        <Box display={'flex'} w={'80%'}>
                          <Image
                            w={'52px'}
                            h={'52px'}
                            display={'inline'}
                            src={`${props.cart?.cartItems.map((a) =>
                              a.product?.attachments.map((b) => b.url)
                            )}`}
                            mt={3}
                            mx={3}
                          />
                          <Link to={`/order/detail/${props.id}`}>
                            <Text
                              mt={4}
                              id="fm500"
                              fontSize={'16px'}
                              textOverflow={'ellipsis'}
                              overflow={'hidden'}
                              whiteSpace={'nowrap'}
                              fontWeight={'700'}
                            >
                              {props.cart?.cartItems.map(
                                (a) => a.product?.name
                              )}
                            </Text>
                          </Link>
                          <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                            {props.cart?.cartItems.map((a) => a.qty)} Barang
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
                            {formatCurrency(props.price)}
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
    </>
  );
}
