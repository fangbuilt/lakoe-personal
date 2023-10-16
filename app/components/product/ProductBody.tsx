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
import AddCircle from '~/assets/icon-pack/add-circle.svg';
import useDebounce from '~/hooks/product/useDebounce';
import { useFilterProducts } from '~/hooks/product/useFilterProducts';
import useSearchProducts from '~/hooks/product/useSearchProducts';
import { useSortProducts } from '~/hooks/product/useSortProducts';
import type { IProduct } from '~/interfaces/product/product';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import ProductTab from './ProductTab';
import { useEffect, useState } from 'react';
import ProductEmpty from './ProductEmpty';
import ProductEmptyActive from './ProductEmptyActive';
import ProductEmptyNonActive from './ProductEmptyNonActive';
import { updateIsActive } from '~/modules/product/product.service';
import ProductModalSelect from './ProductModalSelect';

interface IProductBodyProps {
  product: IProduct[];
}
export default function ProductBody(props: IProductBodyProps) {
  const { product } = props;
  const [activeTab, setActiveTab] = useState(0);
  const { searchProducts, setSearchQuery } = useSearchProducts(
    product,
    activeTab
  );
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { selectedCategories, toggleCategory, getSelectedCategoryCount } =
    useFilterProducts();
  const { selectedSortOption, setSortOption, getSelectedSortOption } =
    useSortProducts();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const handleSelectAllChange = () => {
    setSelectAllChecked(!selectAllChecked);
    const selectedIds = searchProducts.map((product) => product.id);
    setSelectedItems(selectAllChecked ? [] : selectedIds);
    selectedIds.forEach((productId) => {
      updateIsActive({ id: productId, isActive: !selectAllChecked });
    });
  };

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  useEffect(() => {
    if (selectAllChecked) {
      setSelectedItems(searchProducts.map((product) => product.id));
    } else {
      setSelectedItems([]);
    }
  }, [selectAllChecked, searchProducts]);

  const handleItemSelectChange = (productId: string, isSelected: boolean) => {
    setSelectedItems((prevSelected) => {
      if (isSelected) {
        return [...prevSelected, productId];
      } else {
        return prevSelected.filter((id) => id !== productId);
      }
    });
  };

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
                gap={1}
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
              {searchProducts.length === 0 ? (
                <ProductEmpty />
              ) : (
                <>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Text fontSize={'18px'} fontWeight={'bold'}>
                      {searchProducts.length} Produk
                    </Text>
                    <Box display={'flex'} gap={2}>
                      {selectAllChecked && (
                        <>
                          <ProductModalSelect
                            {...searchProducts[0]}
                            selectedProductCount={searchProducts.length}
                          />
                        </>
                      )}
                      <Text fontSize={'14px'}>Pilih Semua</Text>
                      <Checkbox
                        isChecked={selectAllChecked}
                        onChange={handleSelectAllChange}
                      ></Checkbox>
                    </Box>
                  </Box>
                  {searchProducts.map((a) => (
                    <ProductCard
                      key={a.id}
                      product={a}
                      isActive={a.isActive}
                      isSelected={selectedItems.includes(a.id)}
                      onSelectChange={(isSelected) =>
                        handleItemSelectChange(a.id, isSelected)
                      }
                    >
                      <ProductModal {...a} />
                    </ProductCard>
                  ))}
                </>
              )}
            </TabPanel>
            <TabPanel>
              {searchProducts.length === 0 ? (
                <ProductEmptyActive />
              ) : (
                <>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Text fontSize={'18px'} fontWeight={'bold'}>
                      {searchProducts.length} Produk
                    </Text>
                    <Box display={'flex'} gap={2}>
                      {selectAllChecked && (
                        <>
                          <ProductModalSelect
                            {...searchProducts[0]}
                            selectedProductCount={searchProducts.length}
                          />
                        </>
                      )}
                      <Text fontSize={'14px'}>Pilih Semua</Text>
                      <Checkbox
                        isChecked={selectAllChecked}
                        onChange={handleSelectAllChange}
                      ></Checkbox>
                    </Box>
                  </Box>
                  {searchProducts.map((a) => (
                    <ProductCard
                      key={a.id}
                      product={a}
                      isActive={a.isActive}
                      isSelected={selectedItems.includes(a.id)}
                      onSelectChange={(isSelected) =>
                        handleItemSelectChange(a.id, isSelected)
                      }
                    >
                      <ProductModal {...a} />
                    </ProductCard>
                  ))}
                </>
              )}
            </TabPanel>
            <TabPanel>
              {searchProducts.length === 0 ? (
                <ProductEmptyNonActive />
              ) : (
                <>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'space-between'}
                  >
                    <Text fontSize={'18px'} fontWeight={'bold'}>
                      {searchProducts.length} Produk
                    </Text>
                    <Box display={'flex'} gap={2}>
                      {selectAllChecked && (
                        <>
                          <ProductModalSelect
                            {...searchProducts[0]}
                            selectedProductCount={searchProducts.length}
                          />
                        </>
                      )}
                      <Text fontSize={'14px'}>Pilih Semua</Text>
                      <Checkbox
                        isChecked={selectAllChecked}
                        onChange={handleSelectAllChange}
                      ></Checkbox>
                    </Box>
                  </Box>
                  {searchProducts.map((a) => (
                    <ProductCard
                      key={a.id}
                      product={a}
                      isActive={a.isActive}
                      isSelected={selectedItems.includes(a.id)}
                      onSelectChange={(isSelected) =>
                        handleItemSelectChange(a.id, isSelected)
                      }
                    >
                      <ProductModal {...a} />
                    </ProductCard>
                  ))}
                </>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </>
  );
}
