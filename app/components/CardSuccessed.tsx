import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
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
  Image,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import Empty from '../assets/icon-pack/empty-dot.svg';
import { whatsappConfiguration } from '../utils/TemplateMessage';
import ChevronDownIcon from '../assets/icon-pack/arrow-dropdown.svg';
import SearchProduct from '../assets/icon-pack/search-product.svg';
import { useFilterCourier } from '~/hooks/useFilterCourier';
import { useSortFilter } from '~/hooks/useSortFilter';
import ReceiptSearch from '../assets/icon-pack/receipt-search.svg';
import UseSearchProductUnpaid from '~/hooks/useSearchOrderUnpaid';

export default function CardSuccessed() {
  function formatCurrency(price: number): string {
    return price.toLocaleString('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  const { isOpen, onOpen, onClose } = useDisclosure(); // modal
  const {
    getSelectedCourier,
    filteredOrder,
    setSearchQuery,
    // searchQuery,
    selectedCouriers,
    // handleCourierCheckboxChange,
  } = UseSearchProductUnpaid();
  const { toggleCourier } = useFilterCourier(); // courier selected
  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortFilter(); // sort selcted

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
          {filteredOrder.map((data, index) => (
            <Card mb={5} mt={5} boxShadow={'xs'} key={data.id}>
              <Box>
                <Box mt={5}>
                  <Box>
                    <Flex justifyContent={'space-between'} px={2}>
                      <Button
                        bg={'#EA3829'}
                        color={'white'}
                        fontWeight={'bold'}
                        colorScheme="red.500"
                        size={'sm'}
                        pointerEvents={'none'}
                      >
                        {data.status === 'ORDER_COMPLETED'
                          ? 'Pesanan Selesai'
                          : ''}
                      </Button>

                      {/* SET WHAT DO YOU WANT TO DO WITH YOUR BUTTON HERE */}

                      <Button
                        bg={'transparent'}
                        border={'1px solid #D5D5D5'}
                        borderRadius={'full'}
                        fontSize={'14px'}
                        height={'32px'}
                        onClick={onOpen}
                        py={4}
                      >
                        Hubungi Pembeli
                      </Button>

                      <Modal onClose={onClose} isOpen={isOpen} isCentered>
                        <ModalOverlay bg={'whiteAlpha.50'} />
                        <ModalContent>
                          <ModalHeader>
                            Send Message To {data.receiverName}{' '}
                          </ModalHeader>
                          <ModalCloseButton />
                          <ModalBody>
                            <Accordion allowToggle>
                              {data.cart?.store?.messageTemplates.map(
                                (item) => (
                                  <AccordionItem key={item.id}>
                                    <Text>
                                      <AccordionButton>
                                        <Box
                                          as="span"
                                          flex="1"
                                          textAlign="left"
                                        >
                                          Template Message {item.id}
                                        </Box>
                                        <AccordionIcon />
                                      </AccordionButton>
                                    </Text>
                                    <AccordionPanel pb={4}>
                                      {item.content} hehe
                                      <Button
                                        colorScheme={'whatsapp'}
                                        float={'right'}
                                      >
                                        <Link
                                          to={whatsappConfiguration(
                                            data.receiverPhone,
                                            item.content
                                          )}
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
                    </Flex>
                    <Text my={1} fontSize={'14px'} color={'gray.400'} px={2}>
                      INV/{data.invoiceNumber}
                    </Text>
                    <hr />

                    <Flex justifyContent={'space-between'}>
                      <Box display={'flex'} gap={3} w={'80%'}>
                        <Img
                          w={'52px'}
                          h={'52px'}
                          display={'inline'}
                          borderRadius={'md'}
                          src={
                            data.cart?.cartItems[0]?.product?.attachments[0]
                              ?.url
                          }
                          mt={3}
                          ms={2}
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
                            (item) => item.product?.name
                          )}
                          <Text color={'gray.400'} pb={3} fontWeight={'normal'}>
                            {data.cart?.cartItems.map((item) => item.qty)}{' '}
                            Barang
                          </Text>
                        </Text>
                      </Box>
                      <Box mt={4} w={'18%'}>
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
