import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
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
import AddCircle from '~/assets/icon-pack/add-circle.svg';
import BoxSearch from '~/assets/icon-pack/box-search.svg';
import Empty from '~/assets/icon-pack/empty.svg';
import type { IProduct } from '~/interfaces/product/product';
import ProductCard from '~/components/product/ProductCard';
import ProductEmpty from '~/components/product/ProductEmpty';
import { useSearchProducts } from '~/hooks/useSearchProducts';
import { useFilterProducts } from '~/hooks/useFilterProducts';
import { useSortProducts } from '~/hooks/useSortProducts';

export async function loader() {
  const res = await fetch('https://api.npoint.io/ee9d3229a94459dc546b');
  const data = await res.json();
  return data as IProduct[];
}

export default function Product({ items }: { items: IProduct[] }) {
  const { setSearchQuery, filterList } = useSearchProducts(items);
  const { selectedCategories, toggleCategory, getSelectedCategoryCount } =
    useFilterProducts();
  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortProducts();

  return (
    <>
      <Box w={'100%'} bgColor={'white'} borderRadius={10}>
        <Box px={5} py={4}>
          <Box
            display={'flex'}
            alignItems={'center'}
            justifyContent={'space-between'}
          >
            <Text fontWeight={'bold'} fontSize={'20px'}>
              Daftar Produk
            </Text>
            <Button
              borderRadius={20}
              bgColor={'#0086B4'}
              fontSize={'14px'}
              color={'white'}
              colorScheme={'#0086B4'}
            >
              <Image src={AddCircle} />
              Tambah Produk
            </Button>
          </Box>
        </Box>
        <Tabs w={'100%'}>
          <TabList px={1}>
            <Tab>
              <Text fontSize={'16px'}>Semua</Text>
            </Tab>
            <Tab>
              <Text fontSize={'16px'}>Aktif</Text>
            </Tab>
            <Tab>
              <Text fontSize={'16px'}>Nonaktif</Text>
            </Tab>
          </TabList>
          <Box px={5} py={3} display={'flex'} gap={2}>
            <Box>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Image src={BoxSearch} />}
                />
                <Input
                  variant="outline"
                  placeholder="Cari Produk"
                  w={'200px'}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Box>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                variant="outline"
                bgColor={'white'}
                w={'240px'}
              >
                <Text fontSize={'14px'} textAlign={'left'} isTruncated>
                  {getSelectedCategoryCount() > 0
                    ? `${getSelectedCategoryCount()} kategori terpilih`
                    : 'Semua Kategori'}
                </Text>
              </MenuButton>
              <MenuList minWidth="190px" maxW="190px">
                <MenuItem
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Checkbox
                    onChange={() =>
                      toggleCategory('Audio, Kamera & Elektronik')
                    }
                    isChecked={selectedCategories.includes(
                      'Audio, Kamera & Elektronik'
                    )}
                  >
                    <Text maxW="160px" isTruncated>
                      Audio, Kamera & Elektronik
                    </Text>
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    onChange={() => toggleCategory('Buku')}
                    isChecked={selectedCategories.includes('Buku')}
                  >
                    Buku
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    onChange={() => toggleCategory('Dapur')}
                    isChecked={selectedCategories.includes('Dapur')}
                  >
                    Dapur
                  </Checkbox>
                </MenuItem>
                <MenuItem
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  <Checkbox
                    onChange={() => toggleCategory('Fashion Anak & Bayi')}
                    isChecked={selectedCategories.includes(
                      'Fashion Anak & Bayi'
                    )}
                  >
                    <Text maxW="160px" isTruncated>
                      Fashion Anak & Bayi
                    </Text>
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    onChange={() => toggleCategory('Fashion Muslim')}
                    isChecked={selectedCategories.includes('Fashion Muslim')}
                  >
                    Fashion Muslim
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    onChange={() => toggleCategory('Fashion Pria')}
                    isChecked={selectedCategories.includes('Fashion Pria')}
                  >
                    Fashion Pria
                  </Checkbox>
                </MenuItem>
                <MenuItem>
                  <Checkbox
                    onChange={() => toggleCategory('Fashion Wanita')}
                    isChecked={selectedCategories.includes('Fashion Wanita')}
                  >
                    Fashion Wanita
                  </Checkbox>
                </MenuItem>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                w={'240px'}
                variant="outline"
                bgColor={'white'}
              >
                <Text fontSize={'14px'} textAlign={'left'}>
                  {getSelectedSortOption()
                    ? getSelectedSortOption()
                    : 'Urutkan'}
                </Text>
              </MenuButton>
              <MenuList minWidth={'190px'}>
                <MenuItem
                  onClick={() => setSortOption('Terakhir Diubah')}
                  className={
                    selectedSortOption === 'Terakhir Diubah' ? 'active' : ''
                  }
                >
                  Terakhir Diubah
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Terakhir Diubah'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => setSortOption('Terlaris')}
                  className={selectedSortOption === 'Terlaris' ? 'active' : ''}
                >
                  Terlaris
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Terlaris'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => setSortOption('Kurang Diminati')}
                  className={
                    selectedSortOption === 'Kurang Diminati' ? 'active' : ''
                  }
                >
                  Kurang Diminati
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Kurang Diminati'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => setSortOption('Harga Tertinggi')}
                  className={
                    selectedSortOption === 'Harga Tertinggi' ? 'active' : ''
                  }
                >
                  Harga Tertinggi
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Harga Tertinggi'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => setSortOption('Harga Terendah')}
                  className={
                    selectedSortOption === 'Harga Terendah' ? 'active' : ''
                  }
                >
                  Harga Terendah
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Harga Terendah'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => setSortOption('Stok Terbanyak')}
                  className={
                    selectedSortOption === 'Stok Terbanyak' ? 'active' : ''
                  }
                >
                  Stok Terbanyak
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Stok Terbanyak'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
                <MenuItem
                  onClick={() => setSortOption('Stok Tersedikit')}
                  className={
                    selectedSortOption === 'Stok Tersedikit' ? 'active' : ''
                  }
                >
                  Stok Tersedikit
                  <Image
                    src={Empty}
                    ml={'auto'}
                    display={
                      selectedSortOption === 'Stok Tersedikit'
                        ? 'inline-block'
                        : 'none'
                    }
                  />
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <TabPanels>
            <TabPanel>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'18px'} fontWeight={'bold'}>
                  5 Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {/* conten di sini */}
              {filterList.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  isActive={item.isActive}
                  sku={item.sku}
                  stock={item.stock}
                  varians={item.varians}
                />
              ))}
            </TabPanel>
            <TabPanel>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'18px'} fontWeight={'bold'}>
                  4 Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {filterList.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  isActive={item.isActive}
                  sku={item.sku}
                  stock={item.stock}
                  varians={item.varians}
                />
              ))}
            </TabPanel>
            <TabPanel>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'18px'} fontWeight={'bold'}>
                  0 Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              <ProductEmpty />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
