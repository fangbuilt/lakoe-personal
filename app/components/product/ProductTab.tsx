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
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import BoxSearch from '~/assets/icon-pack/box-search.svg';
import Empty from '~/assets/icon-pack/empty.svg';

interface IProductTabProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategories: string[];
  toggleCategory: (category: string) => void;
  getSelectedCategoryCount: () => number;
  selectedSortOption: string | null;
  setSortOption: (option: string) => void;
  getSelectedSortOption: () => string | null;
}

export default function ProductTab(props: IProductTabProps) {
  const {
    setSearchTerm,
    selectedCategories,
    toggleCategory,
    getSelectedCategoryCount,
    selectedSortOption,
    setSortOption,
    getSelectedSortOption,
  } = props;

  return (
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </Box>
      {/* kategori */}
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
              onChange={() => toggleCategory('Audio, Kamera & Elektronik')}
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
              isChecked={selectedCategories.includes('Fashion Anak & Bayi')}
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
      {/* urutan */}
      <Menu>
        <MenuButton
          as={Button}
          rightIcon={<ChevronDownIcon />}
          w={'240px'}
          variant="outline"
          bgColor={'white'}
        >
          <Text fontSize={'14px'} textAlign={'left'}>
            {getSelectedSortOption() ? getSelectedSortOption() : 'Urutkan'}
          </Text>
        </MenuButton>
        <MenuList minWidth={'190px'}>
          <MenuItem
            onClick={() => setSortOption('Terakhir Diubah')}
            className={selectedSortOption === 'Terakhir Diubah' ? 'active' : ''}
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
                selectedSortOption === 'Terlaris' ? 'inline-block' : 'none'
              }
            />
          </MenuItem>
          <MenuItem
            onClick={() => setSortOption('Kurang Diminati')}
            className={selectedSortOption === 'Kurang Diminati' ? 'active' : ''}
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
            className={selectedSortOption === 'Harga Tertinggi' ? 'active' : ''}
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
            className={selectedSortOption === 'Harga Terendah' ? 'active' : ''}
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
            className={selectedSortOption === 'Stok Terbanyak' ? 'active' : ''}
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
            className={selectedSortOption === 'Stok Tersedikit' ? 'active' : ''}
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
  );
}
