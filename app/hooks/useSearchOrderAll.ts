// Komponen React Anda (misalnya, SearchPage.tsx)

import { useState, useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';

export default function UseSearchAll() {
  const { unpaidCardAll } = useLoaderData<typeof loader>();
  const dataArray = Object.values(unpaidCardAll);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(dataArray);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = dataArray.filter((items) => {
      const productName =
        items.cart?.cartItems
          .map((item) => item.product?.name?.toLowerCase())
          .flat() || [];
      const invoiceNumber = items.invoiceNumber?.toLowerCase() || '';

      // const kurirSearch = filteredOrders.map((item) => item.courier?.courierName);
      // console.log("ini kururrrrrrrrr", kurirSearch);
      // const kurirSearch = items.courier?.courierName || "";
      // console.log("ini kurirSearch", kurirSearch);

      // Menggunakan indexOf untuk memeriksa ketersediaan lowerQuery di dalam productName atau invoiceNumber
      return (
        productName.some((name) => name && name.indexOf(lowerQuery) !== -1) ||
        invoiceNumber.indexOf(lowerQuery) !== -1
        // || kurirSearch.indexOf(lowerQuery) !== -1
      );
    });
    // console.log('filtered data:', filtered); // Tambahkan log ini
    setFilteredOrders(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, unpaidCardAll]);

  return { filteredOrders, setSearchQuery, searchQuery };
}
