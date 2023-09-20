import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import type { IProduct } from '../../interfaces/product/product';

const useSearchProducts = (initialProducts: IProduct[], activeTab: number) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchProducts, setSearchProducts] =
    useState<IProduct[]>(initialProducts);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const filteredProducts = initialProducts
      .filter((product) =>
        product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
      .filter((product) => {
        if (activeTab === 1) {
          return product.isActive;
        } else if (activeTab === 2) {
          return !product.isActive;
        }
        return true;
      });

    setSearchProducts(filteredProducts);
  }, [debouncedSearchQuery, initialProducts, activeTab]);

  return { setSearchQuery, searchProducts };
};

export default useSearchProducts;
