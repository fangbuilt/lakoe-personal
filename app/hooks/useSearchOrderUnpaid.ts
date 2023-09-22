// Komponen React Anda (misalnya, SearchPage.tsx)

import { useState, useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';

export default function UseSearchProductUnpaid() {
  const { unpaidCard } = useLoaderData<typeof loader>();
  const dataArray = Object.values(unpaidCard);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrder, setFilteredOrder] = useState(dataArray);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = dataArray.filter((items) => {
      const productName =
        items.cart?.cartItems
          .map((item) => item.product?.name?.toLowerCase())
          .flat() || [];
      const invoiceNumber = items.invoiceNumber?.toLowerCase() || '';

      return (
        productName.some((name) => name && name.indexOf(lowerQuery) !== -1) ||
        invoiceNumber.indexOf(lowerQuery) !== -1
        // || kurirSearch.indexOf(lowerQuery) !== -1
      );
    });
    setFilteredOrder(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, unpaidCard]);

  return { filteredOrder, setSearchQuery, searchQuery };
}
