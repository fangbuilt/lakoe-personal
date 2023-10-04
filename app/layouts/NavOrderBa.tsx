/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useSortFilter } from '~/hooks/useSortFilter';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';
import ChevronDownIcon from '../assets/icon-pack/arrow-dropdown.svg';
import Empty from '../assets/icon-pack/empty-dot.svg';
import ReceiptSearch from '../assets/icon-pack/receipt-search.svg';
import SearchProduct from '../assets/icon-pack/search-product.svg';
import CardNewOrderBa from '../components/CardNewOrderBa';
import ScrollBox from '../components/ScrollBox';
import { useFilterCourier } from '../hooks/useFilterCourier';
import { UseSearch } from '../hooks/useSearchOrder copy';

interface IOrderDetailInvoiceProps {
  orderDetailInvoice: IOrderDetailInvoice[];
}

export default function NavOrderBa(props: IOrderDetailInvoiceProps) {
  const { orderDetailInvoice } = props;
  const { filteredOrders, setSearchQuery } = UseSearch();
  const { selectedCouriers, toggleCourier, getSelectedCourier } =
    useFilterCourier();
  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortFilter();

  const filteredOrdersByCourier = filteredOrders.filter((order) => {
    if (selectedCouriers.length === 0) {
      return true;
    }
    // return selectedCouriers.includes(order.courier);
  });

  return (
    <>
      <Box
        background={'whitesmoke'}
        style={{ width: '100%', marginLeft: '-5px', marginRight: '50%' }}
      >
        <Box
          background={'white'}
          position={'fixed'}
          top={'50'}
          style={{
            marginTop: '1.3%',
            width: '47.5%',
            height: '100%',
            borderRadius: '10px',
          }}
        >
          <Tabs>
            <Box my={4} mx={5}>
              <Text fontWeight={'bold'} fontSize={'20px'}>
                Daftar Pesanan
              </Text>
            </Box>

            <Box>
              <Box
                display={'flex'}
                overflow={'scroll'}
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >
                <TabList mx={5}>
                  <Tab>Semua</Tab>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Belum </Text> <Text> Dibayar</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Pesanan</Text> <Text>Baru</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>

                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER  !*/}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}

                        <Flex gap={1.5}>
                          <Text>Siap </Text> <Text>Dikirim</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        {/* NOTIFICATION ORDER */}
                        <Text
                          my={4}
                          color={'white'}
                          bg={'cyan.400'}
                          borderRadius={'full'}
                          boxSize={'24px'}
                          fontSize={14}
                          marginRight={2}
                        >
                          2 {/* INSERT YOUR NOTIF DATA HERE */}
                        </Text>
                        {/* END NOTIFICATION ORDER */}
                        <Flex gap={1.5}>
                          <Text>Dalam </Text> <Text> Pengiriman</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Box textAlign={'center'}>
                    <Box display={'flex'}>
                      <Tab>
                        <Flex gap={1.5} my={4}>
                          <Text>Pesanan </Text> <Text> Selesai</Text>
                        </Flex>
                      </Tab>
                    </Box>
                  </Box>
                  <Tab>Dibatalkan</Tab>
                </TabList>
              </Box>
              {/* </Tabs> */}
            </Box>

            <Box my={5} paddingBottom={'100px'} background={'white'}>
              <Box mr={5} my={3} width={'100%'}>
                <Box display={'flex'} mx={2} justifyContent={'space-between'}>
                  <InputGroup mx={3}>
                    <InputLeftElement pointerEvents="none">
                      <Image src={SearchProduct} />
                    </InputLeftElement>
                    <Input
                      type="text"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Cari Pesanan"
                      _placeholder={{
                        opacity: 1,
                        color: '#909090',
                        fontSize: '14px',
                      }}
                    />
                  </InputGroup>

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
              </Box>
              <TabPanels>
                {/* YOUR CARD START IN HERE ! */}
                {/* PASTE YOUR CARD IN HERE DON'T FORGET TO MAP IT*/}

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrdersByCourier.map((data, index) => (
                      <CardUnpaid
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                    {/* {props.map((data) => ( */}
                    {orderDetailInvoice?.map((a) => (
                      <CardNewOrderBa key={a.id} {...a} />
                    ))}

                    {/* ))} */}
                    {/* {filteredOrdersByCourier.map((data, index) => (
                      <CardReadyToShip
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                    {/* {filteredOrdersByCourier.map((data, index) => (
                      <CardInShipping
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))}
                    {filteredOrdersByCourier.map((data, index) => (
                      <CardSuccessOrder
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))}
                    {filteredOrdersByCourier.map((data, index) => (
                      <CardCanceled
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrdersByCourier.map((data: any) => (
                      <CardReadyToShip
                        key={data}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel></TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrdersByCourier.map((data, index) => (
                      <CardReadyToShip
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrdersByCourier.map((data, index) => (
                      <CardInShipping
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrdersByCourier.map((data, index) => (
                      <CardSuccessOrder
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                  </TabPanel>
                </ScrollBox>

                <ScrollBox>
                  <TabPanel>
                    {/* {filteredOrdersByCourier.map((data: any, index: any) => (
                      <CardCanceled
                        key={index}
                        id={data.id}
                        title={data.titleProduct}
                        telephone={data.telephone}
                        invoice={data.invoice}
                        totalAmount={data.totalAmount}
                        imageProduct={data.imageProduct}
                      />
                    ))} */}
                  </TabPanel>
                </ScrollBox>
                {filteredOrdersByCourier.length === 0 && (
                  <Center>
                    <Box textAlign="center" mt={5} display={'flex'}>
                      <Image src={ReceiptSearch} />
                      <Text fontSize="16px" mt={1}>
                        Oops, pesanan yang kamu cari tidak ditemukan.
                        <Text
                          fontSize={'12px'}
                          color={'#909090'}
                          textAlign={'left'}
                        >
                          Coba bisa cari dengan kata kunci lain
                        </Text>
                      </Text>
                    </Box>
                  </Center>
                )}

                {/* END CARD */}
              </TabPanels>
            </Box>
          </Tabs>
        </Box>
      </Box>
    </>
  );
}
