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
} from '@chakra-ui/react';
import { Form, useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { loader } from '~/routes/order';
import ModalTracking from '../orderTrackingModal';
import { Link } from 'react-router-dom';
import ReceiptSearch from '../../assets/icon-pack/receipt-search.svg';
import Empty from '../../assets/icon-pack/empty-dot.svg';
import ChevronDownIcon from '../../assets/icon-pack/arrow-dropdown.svg';
import SearchProduct from '../../assets/icon-pack/search-product.svg';
import UseFilterReadyToShip from '../../modules/order/hooks/useFilterCanceled';
import { useSortFilter } from '~/hooks/useSortFilter';
// import type { IBiteshipTracking } from "~/interfaces/orderTracking";

export function formatCurrency(price: number): string {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedAmount;
}

export default function CardReadyToShip() {
  //import loader
  const cardProduct = useLoaderData<typeof loader>();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [cardModals, setCardModals] = useState<{ [key: string]: boolean }>({});
  // const [disabledButtons, setDisabledButtons] = useState<string[]>([]);

  // const currentTime = new Date().getTime();

  const newCurrentTime = cardProduct.currentTime;

  function openModal(trackingId: string, id: string) {
    // Check if the modal for this card is already open
    if (cardModals[id]) {
      return;
    }

    // Set the modal state for this card to open
    const updatedCardModals = { ...cardModals };
    updatedCardModals[id] = true;
    setCardModals(updatedCardModals);

    setSelectedCardId(trackingId);
    setModalIsOpen(true);
  }

  function closeModal(id: string) {
    // Set the modal state for this card to closed
    const updatedCardModals = { ...cardModals };
    updatedCardModals[id] = false;
    setCardModals(updatedCardModals);

    setModalIsOpen(false);
  }
  const {
    getSelectedCourier,
    filteredOrder,
    setSearchQuery,
    // searchQuery,
    selectedCouriers,
    handleCourierCheckboxChange,
  } = UseFilterReadyToShip();
  const {
    selectedSortOption,
    setSortOption,
    getSelectedSortOption,
    sortOrders,
  } = useSortFilter(); // sort filter
  const sortedOrders = sortOrders(filteredOrder);
  return (
    <>
      {/* CARD START HERE */}
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
          {sortedOrders.map((data) => (
            <Card mb={5} boxShadow={'xs'} key={data.id}>
              <Box key={data.id}>
                <Box mt={5}>
                  <Box>
                    <Flex justifyContent={'space-between'} px={2}>
                      <Button
                        bg={'#147AF3'}
                        color={'white'}
                        fontWeight={'bold'}
                        colorScheme="gray.600"
                        size={'sm'}
                        pointerEvents={'none'}
                      >
                        {data.status === 'READY_TO_SHIP' ? 'Siap Dikirim' : ''}
                      </Button>
                      <Form
                        method="POST"
                        onSubmit={() => {
                          openModal(
                            data.courier?.trackingId as string,
                            data.id
                          );
                        }}
                      >
                        <Input
                          name="actionType"
                          value={'createTrackingLimit'}
                          hidden
                        />
                        <Input name="invoiceId" value={data.id} hidden />
                        <Button
                          bg={'transparent'}
                          border={'1px solid #D5D5D5'}
                          borderRadius={'full'}
                          fontSize={'14px'}
                          isDisabled={
                            // Your condition for disabling the button
                            newCurrentTime / 1000 <
                            new Date(
                              data.biteshipTrackinglimits?.nextAccessTime ?? ''
                            ).getTime() /
                              1000
                            // showModalForCardId === data.id
                          }
                          type="submit"
                        >
                          Tracking Pengiriman
                        </Button>
                      </Form>
                    </Flex>
                    <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                      {data.invoiceNumber}
                    </Text>
                    <Divider />
                    <Link to={`detail/${data.id}`}>
                      <Flex justifyContent={'space-between'}>
                        <Box display={'flex'} gap={3} w={'80%'}>
                          {data.cart?.cartItems.map((item: any) => (
                            <Img
                              key={item.id}
                              w={'52px'}
                              h={'52px'}
                              display={'inline'}
                              borderRadius={'md'}
                              src={item.product?.attachments[0]?.url}
                              mt={3}
                            />
                          ))}
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
                            {formatCurrency(data.price)}
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Card>
          ))}
          {modalIsOpen && (
            <ModalTracking
              isOpen={modalIsOpen}
              onClose={() => closeModal(selectedCardId)}
              selectedCardId={selectedCardId}
            />
          )}

          {/* END CARD */}
        </Box>
      )}
    </>
  );
}
