import { useState, useEffect } from 'react';
import type { IProduct } from '~/interfaces/product/product';

export function useSearchProducts(items: IProduct[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterList, setFilterList] = useState(items);

  useEffect(() => {
    const search = items.filter((list) =>
      list.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilterList(search);
  }, [searchQuery, items]);

  return { searchQuery, setSearchQuery, filterList };
}
