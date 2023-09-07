import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
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
import { useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import AddCircle from '~/assets/icon-pack/add-circle.svg';
import BoxSearch from '~/assets/icon-pack/box-search.svg';
import type { IProduct } from '~/components/product/ProductCard';
import ProductCard from '~/components/product/ProductCard';
import ProductEmpty from '~/components/product/ProductEmpty';
import { ImplementGrid } from '~/layouts/Grid';

export async function loader() {
  const res = await fetch('https://api.npoint.io/ee9d3229a94459dc546b');
  const data = await res.json();
  return data as IProduct[];
}

export default function Product() {
  const items = useLoaderData<typeof loader>();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterList, setFilterList] = useState(items);

  // const [categoryQuery, setCategoryQuery] = useState();
  // const [filterCategory, setFilterCategory] = useState(items);

  // In the future, it will be refactored using a prism query
  const search = items.filter((list) =>
    list.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // const category = items.filter((varian) =>
  //   varian.varians.toLowerCase().includes(categoryQuery.toLowerCase())
  // );
  useEffect(() => {
    setFilterList(search);
    // setFilterCategory(category);
  }, [searchQuery]);
  return (
    <>
      <ImplementGrid>
        <Flex my={12}>
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
                    <Text fontSize={'14px'} textAlign={'left'}>
                      Semua Kategori
                    </Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>
                      <Checkbox>Audio, Kamera & Elektronik</Checkbox>
                    </MenuItem>
                    <MenuItem>
                      <Checkbox>Buku</Checkbox>
                    </MenuItem>
                    <MenuItem>
                      <Checkbox>Dapur</Checkbox>
                    </MenuItem>
                    <MenuItem>
                      <Checkbox>Fashion Anak & Bayi</Checkbox>
                    </MenuItem>
                    <MenuItem>
                      <Checkbox>Fashion Muslim</Checkbox>
                    </MenuItem>
                    <MenuItem>
                      <Checkbox>Fashion Pria</Checkbox>
                    </MenuItem>
                    <MenuItem>
                      <Checkbox>Fashion Wanita</Checkbox>
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    w={'240px'}
                    variant="outline"
                    bgColor={'white'}
                  >
                    <Text fontSize={'14px'} textAlign={'left'}>
                      Urutan
                    </Text>
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Terkahir Diubah</MenuItem>
                    <MenuItem>Terlaris</MenuItem>
                    <MenuItem>Kurang Diminati</MenuItem>
                    <MenuItem>Harga Tertinggi</MenuItem>
                    <MenuItem>Harga Terendah</MenuItem>
                    <MenuItem>Stok Terbanyak</MenuItem>
                    <MenuItem>Stok Tersedikit</MenuItem>
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
        </Flex>
      </ImplementGrid>
    </>
  );
}
