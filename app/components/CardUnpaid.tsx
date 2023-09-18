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
  // Input,
  // InputGroup,
  // InputLeftElement,
  // Image,
} from '@chakra-ui/react';
// import { Form, Link } from '@remix-run/react';
// import SearchProduct from '../assets/icon-pack/search-product.svg';
// import type { loader } from '~/routes/order';
// import type { IMessageTemplates } from '~/interfaces/order';
import { createWhatsAppTemplateMessageUnpaid } from '~/utils/templateOrder';
// import UseSearchUnpaid from '~/hooks/useSearchOrderUnpaid';
import { Link, useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';
import UseSearchProductUnpaid from '~/hooks/useSearchOrderUnpaid';

export default function UnpaidCard() {
  const { unpaidCard } = useLoaderData<typeof loader>();
  const { filteredOrder, setSearchQuery, searchQuery } =
    UseSearchProductUnpaid();
  console.log('unpaidCard', unpaidCard);

  console.log('setSearchQuery', setSearchQuery);
  console.log('searchQuery', searchQuery);
  console.log('filteredOrderfilteredOrderfilteredOrder', filteredOrder);

  const { isOpen, onOpen, onClose } = useDisclosure();
  // const formatter = new Intl.NumberFormat('en-ID', {
  //   style: 'currency',
  //   currency: 'IDR',
  // });

  return (
    <>
      {/* YOUR CARD IN HERE, COPY AND PASTE TO NAVORDER IN TABPANEL AND MAP YOUR DATA */}
      {/* <Box
        background={'white'}
        position={'fixed'}
        top={'205px'}
        height={'45px'}
        zIndex={'1000'}
      >
        <Box display={'flex'} mx={2} justifyContent={'space-between'}>
          <Form>
            <InputGroup mx={3}>
              <InputLeftElement pointerEvents="none">
                <Image src={SearchProduct} />
              </InputLeftElement>
              <Input
                type="text"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
                placeholder="Cari Pesanan"
                _placeholder={{
                  opacity: 1,
                  color: '#909090',
                  fontSize: '14px',
                }}
              />
            </InputGroup>
          </Form>
         <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              variant="outline"
              bgColor={'white'}
              fontSize={'14px'}
              width={'70%'}
              color={getSelectedCourier() > 0 ? 'black' : '#909090'}
              fontWeight={'normal'}
              me={2}
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
                  value="GoSend"
                  onChange={() => filterByCourier('GoSend')}
                  isChecked={selectedCouriers.includes('GoSend')}
                >
                  GoSend
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="GrabExpress"
                  onChange={() => filterByCourier('GrabExpress')}
                  isChecked={selectedCouriers.includes('GrabExpress')}
                >
                  GrabExpress
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="AnterAja"
                  onChange={() => filterByCourier('AnterAja')}
                  isChecked={selectedCouriers.includes('AnterAja')}
                >
                  AnterAja
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="JNE"
                  onChange={() => filterByCourier('JNE')}
                  isChecked={selectedCouriers.includes('JNE')}
                >
                  JNE
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="J&T"
                  onChange={() => filterByCourier('J&T')}
                  isChecked={selectedCouriers.includes('J&T')}
                >
                  J&T
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="Lion Parcel"
                  onChange={() => filterByCourier('Lion Parcel')}
                  isChecked={selectedCouriers.includes('Lion Parcel')}
                >
                  Lion Parcel
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="Ninja Xpress"
                  onChange={() => filterByCourier('Ninja Xpress')}
                  isChecked={selectedCouriers.includes('Ninja Xpress')}
                >
                  Ninja Xpress
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox
                 value="Pos Indonesia"
                  onChange={() => filterByCourier('Pos Indonesia')}
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
              w={'70%'}
              variant="outline"
              bgColor={'white'}
              me={2}
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
                className={
                  selectedSortOption === 'Semua' ? 'active' : ''
                }
              >
                Semua
                <Image
                  src={Empty}
                  ml={'auto'}
                  display={
                    selectedSortOption === 'Semua'
                      ? 'inline-block'
                      : 'none'
                  }
                />
              </MenuItem>
              <MenuItem
                onClick={() => setSortOption('Paling Baru')}
                className={
                  selectedSortOption === 'Paling Baru' ? 'active' : ''
                }
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
                className={
                  selectedSortOption === 'Paling Lama' ? 'active' : ''
                }
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
                  selectedSortOption === 'Respon Tercepat'
                    ? 'active'
                    : ''
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
                  selectedSortOption === 'Respon Terlama'
                    ? 'active'
                    : ''
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
      </Box> */}
      {/* CARD START HERE */}
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
                    {item.status}
                  </Button>

                  {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}
                  <Button
                    bg={'transparent'}
                    border={'1px solid #D5D5D5'}
                    borderRadius={'full'}
                    fontSize={'14px'}
                    onClick={() => {
                      onOpen();
                    }}
                  >
                    Hubungi Pembeli
                  </Button>
                  <Modal onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay background={'whiteAlpha.50'} />
                    <ModalContent>
                      <ModalHeader>
                        Send Message ke {item.receiverName}
                      </ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Accordion allowToggle>
                          {item.cart?.store?.messageTemplates.map(
                            (itemtemp) => (
                              <AccordionItem key={itemtemp.id}>
                                <Text>
                                  <AccordionButton>
                                    <Box as="span" flex="1" textAlign="left">
                                      Pesan {itemtemp.id}
                                    </Box>
                                    <AccordionIcon />
                                  </AccordionButton>
                                </Text>
                                <AccordionPanel pb={4}>
                                  {itemtemp.content}
                                  <Button
                                    colorScheme={'whatsapp'}
                                    float={'right'}
                                  >
                                    <Link
                                      to={createWhatsAppTemplateMessageUnpaid(
                                        item.receiverPhone ?? '',
                                        itemtemp.content
                                      )}
                                      target="_blank"
                                    >
                                      Kirim
                                    </Link>
                                  </Button>
                                </AccordionPanel>
                              </AccordionItem>
                            )
                          )}
                        </Accordion>
                      </ModalBody>
                      <ModalFooter></ModalFooter>
                    </ModalContent>
                  </Modal>
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
                      {item.cart?.cartItems.map((item) => item.product?.name)}
                      <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                        {item.cart?.cartItems.map((item) => item.qty)} Barang
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

      {/* END CARD */}
    </>
  );
}
