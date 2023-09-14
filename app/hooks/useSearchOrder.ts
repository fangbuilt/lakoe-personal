import { useLoaderData, useNavigate } from '@remix-run/react';
import { useState, useEffect } from 'react';
import dummyMessage from '../utils/templateMessage.json';
import type { loader } from '~/routes/order';

export function UseSearch() {
  const data = useLoaderData<typeof loader>();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(data);
  const navigate = useNavigate();
  useEffect(() => {
    const lowerCaseSearchQuery = searchQuery.toLowerCase();
    console.log(lowerCaseSearchQuery, setFilteredOrders);
    const filtered = dummyMessage.filter((order) => {
      // const productNames =
      //   order.cart?.cartItems
      //     .map((item) => item.product?.name.toLowerCase())
      //     .flat() || [];
      // return (
      //   productNames.includes(lowerCaseSearchQuery.toLowerCase()) ||
      //   order.invoiceNumber.includes(lowerCaseSearchQuery)
      // );
    });

    console.log(filtered);
    // setFilteredOrders(filtered);
  }, [searchQuery, data]);
  // 1. Tambahkan event onChange untuk memperbarui query pencarian
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredOrders,
    // 2. Tambahkan handler perubahan pencarian
    handleSearch,
  };
}
