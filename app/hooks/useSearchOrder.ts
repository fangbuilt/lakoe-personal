<<<<<<< HEAD
import data from '../tests/utils/dummy.json';
=======
import data from '../utils/dummy.json';
>>>>>>> 0aa73c4d167d6e7d3ba456e0ea46edffec25ee63
import { useState, useEffect } from 'react';

export function UseSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(data);
  useEffect(() => {
    const filtered = data.filter(
      (order) =>
        order.titleProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.invoice.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery]);

  return { filteredOrders, setSearchQuery };
}
