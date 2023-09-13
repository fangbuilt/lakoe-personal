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
import { Link } from '@remix-run/react';
import type { ReactNode} from 'react';
import { useState } from 'react';
import AddCircle from '~/assets/icon-pack/add-circle.svg';
import BoxSearch from '~/assets/icon-pack/box-search.svg';
// import ProductEmpty from "./ProductEmpty";
import type IProduct from '~/interfaces/product/product';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';

interface IProductBodyProps {
  children?: ReactNode;
  products: IProduct[];
}
export default function ProductBody(props: IProductBodyProps) {
  const { products } = props;
  const [activeTab, setActiveTab] = useState(0);

  const filteredProducts =
    activeTab === 1
      ? products.filter((a) => a.isActive)
      : activeTab === 2
      ? products.filter((a) => !a.isActive)
      : products;

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
            <Link to={'/product/add'}>
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
            </Link>
          </Box>
        </Box>
        <Tabs w={'100%'} onChange={(index) => setActiveTab(index)}>
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
                  // onChange={(e) => setSearchQuery(e.target.value)}
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
            <Menu closeOnSelect={false}>
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
                  {filteredProducts.length} Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {filteredProducts.map((a) => (
                <ProductCard key={a.id} product={a}>
                  <ProductModal {...a} />
                </ProductCard>
              ))}
            </TabPanel>
            <TabPanel>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'18px'} fontWeight={'bold'}>
                  {filteredProducts.length} Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {filteredProducts.map((a) => (
                <ProductCard key={a.id} product={a}>
                  <ProductModal {...a} />
                </ProductCard>
              ))}
            </TabPanel>
            <TabPanel>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'18px'} fontWeight={'bold'}>
                  {filteredProducts.length} Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {filteredProducts.map((a) => (
                <ProductCard key={a.id} product={a}>
                  <ProductModal {...a} />
                </ProductCard>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
