/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Flex,
  Img,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
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

import { Form, Link, useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';
import React, { useState } from 'react';
import ChevronDownIcon from '../assets/icon-pack/arrow-dropdown.svg';
import SearchProduct from '../assets/icon-pack/search-product.svg';
// import { useFilterCourier } from '~/hooks/useFilterCourier';
import { useSortFilter } from '~/hooks/useSortFilter';
import Empty from '../assets/icon-pack/empty-dot.svg';
import { createWhatsAppTemplateMessageUnpaid } from '~/utils/templateOrder';
import type {
  Item,
  ItemName,
  ItemSend,
  ItemTemplate,
} from '~/type/StatusColorMap';
import {
  statusToColor,
  statusToSendBuyer,
  statusNameButton,
  statusToTemplate,
} from '~/type/StatusColorMap';
import ModalTracking from './orderTrackingModal';
import UnpaidCard from './CardUnpaid';
import CardReadyToShip from './CardReadyToShip';
import CardCenceled from './CardCanceled';
import ModalWhatsapp from './modalProps/modalWhatsapp';
import CardInShipping from './CardInShipping';
import ModalInShipping from './ModalInShipping';
import type { IBiteshipTracking } from '~/interfaces/orderTracking';
import { ModalComponent } from './CardNewOrderBa';
import HooksMasRino from './HooksMasRino';
import UseSearchProductAll from '~/hooks/useSearchOrderAll';
// import UseSearchProductAll from '~/hooks/useSearchOrderAll';
import ReceiptSearch from '../assets/icon-pack/receipt-search.svg';

export default function CardAllOrder(props: {
  dataTracking: IBiteshipTracking;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { filteredOrder, setSearchQuery, searchQuery } = UseSearchAll();
  const { getTemplateMessages } = useLoaderData<typeof loader>();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string>('');
  const [isUnpaidModalOpen, setIsUnpaidModalOpen] = useState(false);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isOrderNewOrderModalOpen, setIsOrderNewOrderModalOpen] =
    useState(false);
  const [isOrderCancelledModalOpen, setIsOrderCancelledModalOpen] =
    useState(false);
  const [isOrderInTransitModalOpen, setIsOrderInTransitModalOpen] =
    useState(false);
  const [isOrderCompletedModalOpen, setIsOrderCompletedModalOpen] =
    useState(false);
  const [modalText, setModalText] = useState('');
  const closeModal = () => {
    setModalIsOpen(false);
    setIsUnpaidModalOpen(false);
    setIsNewOrderModalOpen(false);
    setIsOrderNewOrderModalOpen(false);
    setIsOrderCancelledModalOpen(false);
    setIsOrderInTransitModalOpen(false);
    setIsOrderCompletedModalOpen(false);
  };

  // const {
  //   filteredOrderList,
  //   getSelectedCourier,
  //   selectedCouriers,
  //   toggleCourier,
  //   setSelectedCouriers,
  // } = useFilterCourier();

  const {
    getSelectedCourier,
    filteredOrder,
    setSearchQuery,
    searchQuery,
    selectedCouriers,
    handleCourierCheckboxChange,
  } = UseSearchProductAll();
  const {
    selectedSortOption,
    setSortOption,
    getSelectedSortOption,
    sortOrders,
  } = useSortFilter(); // sort selcted
  //Button color
  const sortedOrders = sortOrders(filteredOrder);

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
  const defaultItem: Item = {
    status: 'UNPAID',
  };
  const item: Item = defaultItem;
  //button send Template
  const defaultItemSend: ItemSend = {
    status: 'UNPAID',
  };
  const itemSend: ItemSend = defaultItemSend;
  //button status
  const defaultItemName: ItemName = {
    status: 'UNPAID',
  };
  const itemName: ItemName = defaultItemName;

  const defaultITemplates: ItemTemplate = {
    status: 'UNPAID',
  };
  const itemTemplate: ItemTemplate = defaultITemplates;
  const { setSelectedProps, afterpacking } = HooksMasRino();

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
        <Box marginTop={'10px'}>
          {sortedOrders.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Card mb={5} mt={5} boxShadow={'xs'} key={item.id}>
              <Box>
                <Box>
                  <Box>
                    <Flex justifyContent={'space-between'} px={3} py={2}>
                      <Button
                        bg={statusToColor[item.status] || ''}
                        colorScheme={statusToColor[item.status] || ''}
                        color={'white'}
                        fontWeight={'bold'}
                        size={'sm'}
                        pointerEvents={'none'}
                        height={'24px'}
                      >
                        {/* {item.status} */}
                        {statusNameButton[item.status] || ''}
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
                          setSelectedCardId(item.id);
                          if (item.status === 'UNPAID') {
                            setIsUnpaidModalOpen(true);
                          }
                          if (item.status === 'NEW_ORDER') {
                            setModalText(
                              'Apakah sudah di pack dan siap dikirim?'
                            );
                            setIsOrderNewOrderModalOpen(true);
                          }
                          if (item.status === 'READY_TO_SHIP') {
                            setIsNewOrderModalOpen(true);
                          }
                          if (item.status === 'ORDER_CANCELLED') {
                            setIsOrderCancelledModalOpen(true);
                          }
                          if (item.status === 'IN_TRANSIT') {
                            setIsOrderInTransitModalOpen(true);
                          }
                          if (item.status === 'ORDER_COMPLETED') {
                            setIsOrderCompletedModalOpen(true);
                          }
                        }}
                        value={statusToSendBuyer[item.status] || ''}
                      >
                        {statusToSendBuyer[item.status] || ''}
                      </Button>

                      {/* Tampilkan modal berdasarkan status */}
                      {isUnpaidModalOpen && item.status === 'UNPAID' && (
                        <ModalWhatsapp
                          isOpen={isUnpaidModalOpen}
                          onClose={closeModal}
                          selectedCardId={item.id}
                          itemName={item.receiverName}
                          itemPhone={item.receiverPhone}
                        />
                      )}
                      {isOrderNewOrderModalOpen &&
                        item.status === 'NEW_ORDER' && (
                          <ModalComponent
                            isOpen={isOrderNewOrderModalOpen}
                            onClose={closeModal}
                            modalText={modalText}
                            onConfirm={afterpacking}
                          />
                        )}
                      {isNewOrderModalOpen &&
                        item.status === 'READY_TO_SHIP' && (
                          <ModalTracking
                            onClose={closeModal}
                            isOpen={isNewOrderModalOpen}
                            selectedCardId={item.id}
                          />
                        )}
                      {isOrderCancelledModalOpen &&
                        item.status === 'ORDER_CANCELLED' && (
                          <ModalWhatsapp
                            onClose={closeModal}
                            isOpen={isOrderCancelledModalOpen}
                            selectedCardId={item.id}
                            itemName={item.receiverName}
                            itemPhone={item.receiverPhone}
                          />
                        )}
                      {isOrderInTransitModalOpen &&
                        item.status === 'IN_TRANSIT' && (
                          <ModalInShipping
                            onClose={closeModal}
                            isOpen={isOrderInTransitModalOpen}
                            data={props.dataTracking}
                            selectedCardId={selectedCardId}
                          />
                        )}
                      {isOrderCompletedModalOpen &&
                        item.status === 'ORDER_COMPLETED' && (
                          <ModalWhatsapp
                            isOpen={isOrderCompletedModalOpen}
                            onClose={closeModal}
                            selectedCardId={item.id}
                            itemName={item.receiverName}
                            itemPhone={item.receiverPhone}
                          />
                        )}
                    </Flex>
                    <Text
                      mb={1}
                      fontSize={'14px'}
                      mt={-3}
                      color={'#909090'}
                      px={3}
                    >
                      {item.invoiceNumber}
                    </Text>
                    <Divider />
                    <Link to={`detail/${item.id}`}>
                      <Flex justifyContent={'space-between'} px={3}>
                        <Box display={'flex'} gap={3} w={'80%'}>
                          <Img
                            w={'52px'}
                            h={'52px'}
                            display={'inline'}
                            borderRadius={'md'}
                            src={`${item.cart?.cartItems.map((item: any) =>
                              item.product?.attachments?.map(
                                (item: any) => item.url
                              )
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
                              (item: any) => item.product?.name
                            )}
                            <Text
                              color={'gray.400'}
                              pb={3}
                              fontWeight={'normal'}
                            >
                              {item.cart?.cartItems.map(
                                (item: any) => item.qty
                              )}{' '}
                              Barang
                              {/* desk {item.cart?.cartItems.map((item:any) =>item.product.description)} */}
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
                            Rp {item.price.toLocaleString('id-ID')}
                          </Text>
                        </Box>
                      </Flex>
                    </Link>
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
