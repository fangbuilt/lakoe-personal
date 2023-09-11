import data from "../tests/utils/dummy.json";
import { useState, useEffect } from "react";

export  function UseSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(data);
  useEffect(() => {
    const filtered = data.filter((order) =>
        order.titleProduct.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.invoice.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchQuery]);

  return { filteredOrders, setSearchQuery };
}