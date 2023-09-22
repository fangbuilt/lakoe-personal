import {
  Box,
  Button,
  Checkbox,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import AddCircle from '~/assets/icon-pack/add-circle.svg';
import useDebounce from '~/hooks/product/useDebounce';
import { useFilterProducts } from '~/hooks/product/useFilterProducts';
import useSearchProducts from '~/hooks/product/useSearchProducts';
import { useSortProducts } from '~/hooks/product/useSortProducts';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import ProductTab from './ProductTab';

export default function ProductBody(props: any) {
  const { product } = props;
  const [, setActiveTab] = useState(0);
  const { searchProducts, setSearchQuery } = useSearchProducts(product);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { selectedCategories, toggleCategory, getSelectedCategoryCount } =
    useFilterProducts();
  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortProducts();

  // const filteredProducts =
  //   activeTab === 1
  //     ? product.filter((a) => a.isActive)
  //     : activeTab === 2
  //       ? product.filter((a) => !a.isActive)
  //       : product;

  // console.log('props product body',props)

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

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
          <ProductTab
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
            getSelectedCategoryCount={getSelectedCategoryCount}
            selectedSortOption={selectedSortOption}
            setSortOption={setSortOption}
            getSelectedSortOption={getSelectedSortOption}
          />
          <TabPanels>
            <TabPanel>
              <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Text fontSize={'18px'} fontWeight={'bold'}>
                  {searchProducts.length} Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {searchProducts.map((a) => (
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
                  {searchProducts.length} Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {searchProducts.map((a) => (
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
                  {searchProducts.length} Produk
                </Text>
                <Box display={'flex'} gap={2}>
                  <Text fontSize={'14px'}>Pilih Semua</Text>
                  <Checkbox defaultChecked></Checkbox>
                </Box>
              </Box>
              {searchProducts.map((a) => (
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
