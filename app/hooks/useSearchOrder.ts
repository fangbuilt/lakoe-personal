import { useLoaderData } from "@remix-run/react";
import { useState,useEffect } from "react";
import { useDebounce } from "use-debounce";
import { loader } from "~/routes/order";

export default function searchFilter (){
  const {canceledService} = useLoaderData<typeof loader>();
  const [filteredOrders, setFilteredOrders] = useState(canceledService);
  const [searchQuery, setSearchQuery] = useState('');
  const [valueDebounce] = useDebounce(searchQuery,1000)
  useEffect(() => {
    const toLowerCase = searchQuery.toLowerCase();
    if(toLowerCase.length > 2 ){
    const filtered = canceledService.filter((order) => {
        const productNames = order.cart?.cartItems.map((item:any) => item.product?.name.toLowerCase()) ?? [];
        const invoiceNumber = order.invoiceNumber.toLowerCase();
        return (
          productNames.some((item) => item.includes(toLowerCase)) ||
          invoiceNumber.includes(toLowerCase)
        );
    });
    setFilteredOrders(filtered);
  }else{
    setFilteredOrders(canceledService)
  }
}, [valueDebounce]);
return {filteredOrders,setSearchQuery,searchQuery}
}
