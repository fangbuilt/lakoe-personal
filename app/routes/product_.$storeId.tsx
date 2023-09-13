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
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import type { LoaderArgs } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import AddCircle from '~/assets/icon-pack/add-circle.svg';
import BoxSearch from '~/assets/icon-pack/box-search.svg';
import ProductCard from '~/components/product/ProductCard';
import ProductEmpty from '~/components/product/ProductEmpty';
import ProductModal from '~/components/product/ProductModal';
import { ImplementGrid } from '~/layouts/Grid';
import { getProductByStoreId } from '~/modules/product/product.service';

export async function loader({ params }: LoaderArgs) {
  return await getProductByStoreId(params.storeId);
}

export default function ProductId() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <ImplementGrid>
        <Stack mt={'7.5vh'} spacing={4}>
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
                      5 Produk
                    </Text>
                    <Box display={'flex'} gap={2}>
                      <Text fontSize={'14px'}>Pilih Semua</Text>
                      <Checkbox defaultChecked></Checkbox>
                    </Box>
                  </Box>
                  {data.map((item) => (
                    <ProductCard key={item.id} product={item}>
                      <ProductModal {...item} />
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
                      4 Produk
                    </Text>
                    <Box display={'flex'} gap={2}>
                      <Text fontSize={'14px'}>Pilih Semua</Text>
                      <Checkbox defaultChecked></Checkbox>
                    </Box>
                  </Box>
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
        </Stack>
      </ImplementGrid>
    </>
  );
}
