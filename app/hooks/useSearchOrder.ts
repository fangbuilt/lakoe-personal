import { useLoaderData } from "@remix-run/react";
import { useState,useEffect } from "react";
import { loader } from "~/routes/order";

export default function searchFilter (){
  const {canceledService} = useLoaderData<typeof loader>();
  const [filteredOrders, setFilteredOrders] = useState(canceledService);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const toLowerCase = searchQuery.toLowerCase();
    const filtered = canceledService.filter((order) => {
        const productNames = order.cart?.cartItems.map((item:any) => item.product?.name.toLowerCase()) || [];
        const invoiceNumber = order.invoiceNumber.toLowerCase();
        return (
          productNames.some((item) => item.includes(toLowerCase)) ||
          invoiceNumber.includes(toLowerCase)
        );
    });
    setFilteredOrders(filtered);
}, [searchQuery,canceledService]);
return {filteredOrders,setSearchQuery,searchQuery}
}



