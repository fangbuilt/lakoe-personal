import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';
import type { IProduct } from '../../interfaces/product/product';

const useSearchProducts = (initialProducts: IProduct[]) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchProducts, setSearchProducts] =
    useState<IProduct[]>(initialProducts);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const filteredProducts = initialProducts.filter((product) =>
      product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setSearchProducts(filteredProducts);
  }, [debouncedSearchQuery, initialProducts]);

  return { setSearchQuery, searchProducts };
};

export default useSearchProducts;
