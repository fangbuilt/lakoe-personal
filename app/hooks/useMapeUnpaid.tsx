import { useState, useEffect } from 'react';

export default function useMapeUnpaid(data: any) {
  const [searchQueryw, setSearchQueryw] = useState('');
  const [filteredOrdersw, setFilteredOrdersw] = useState(data);

  useEffect(() => {
    const filtered = data.filter(
      (order: any) =>
        order.data.store?.products.map((product: any) =>
          product.name.toLowerCase().includes(searchQueryw.toLowerCase())
        )
      // ||
      // order.invoice.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrdersw(filtered);
  }, [data, searchQueryw]);
  // console.log('filteredOrdersfilteredOrdersfilteredOrders', filteredOrdersw);
  return { filteredOrdersw, setSearchQueryw };
}
