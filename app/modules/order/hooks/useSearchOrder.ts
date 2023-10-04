import { useLoaderData } from '@remix-run/react';
import { useState, useEffect } from 'react';
import type { loader } from '~/routes/order';

export default function SearchFilter() {
  const { dataProductReadyToShip } = useLoaderData<typeof loader>();
  const [filteredOrders, setFilteredOrders] = useState(dataProductReadyToShip);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const toLowerCase = searchQuery.toLowerCase();
    const filtered = dataProductReadyToShip.filter((order) => {
      const productNames =
        order.cart?.cartItems.map((item: any) =>
          item.product?.name.toLowerCase()
        ) || [];
      const invoiceNumber = order.invoiceNumber.toLowerCase();
      return (
        productNames.some((item) => item.includes(toLowerCase)) ||
        invoiceNumber.includes(toLowerCase)
      );
    });
    setFilteredOrders(filtered);
  }, [searchQuery, dataProductReadyToShip]);
  return { filteredOrders, setSearchQuery, searchQuery };
}
