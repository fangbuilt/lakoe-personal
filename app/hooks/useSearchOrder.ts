import { useLoaderData } from "@remix-run/react";
import { useState,useEffect } from "react";
import { useDebounce } from "use-debounce";
import { loader } from "~/routes/order";

export default function searchFilterCanceled() {
  const { canceledService } = useLoaderData<typeof loader>();
  const [filteredOrders, setFilteredOrders] = useState(canceledService);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourier, setSelectedCourier] = useState(""); // State untuk menyimpan kurir yang dipilih
  const [valueDebounce] = useDebounce(searchQuery, 1000);

  useEffect(() => {
    const toLowerCase = searchQuery.toLowerCase();
    if (toLowerCase.length > 2) {
      const filtered = canceledService.filter((order) => {
        const productNames = order.cart?.cartItems.map(
          (item: any) => item.product?.name.toLowerCase()
        ) ?? [];
        const invoiceNumber = order.invoiceNumber.toLowerCase();
        const courierName = order.courier?.courierName.toLowerCase();

        // Filter berdasarkan kurir yang dipilih
        const courierMatched =
          selectedCourier === "" || courierName === selectedCourier;

        return (
          courierMatched &&
          (productNames.some((item) => item.includes(toLowerCase)) ||
            invoiceNumber.includes(toLowerCase) ||
            courierName?.includes(toLowerCase))
        );
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(canceledService);
    }
  }, [valueDebounce, selectedCourier]);

  // Handler untuk memperbarui kurir yang dipilih
  const handleCourierChange = (event) => {
    const { value } = event.target;
    setSelectedCourier(value);
  };

  return {
    filteredOrders,
    setSearchQuery,
    searchQuery,
    handleCourierChange,
    selectedCourier,
  };
}

// export default function searchFilterCanceled (){
//   const {canceledService} = useLoaderData<typeof loader>();
//   const [filteredOrders, setFilteredOrders] = useState(canceledService);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [valueDebounce] = useDebounce(searchQuery,1000)
//   useEffect(() => {
//     const toLowerCase = searchQuery.toLowerCase();
//     if(toLowerCase.length > 2 ){
//     const filtered = canceledService.filter((order) => {
//         const productNames = order.cart?.cartItems.map((item:any) => item.product?.name.toLowerCase()) ?? [];
//         const invoiceNumber = order.invoiceNumber.toLowerCase();
//         const courierName = order.courier?.courierName.toLowerCase();
//         return (
//           productNames.some((item) => item.includes(toLowerCase)) ||
//           invoiceNumber.includes(toLowerCase) ||
//           courierName?.includes(toLowerCase)
//         );
//     });
//     setFilteredOrders(filtered);
//   }else{
//     setFilteredOrders(canceledService)
//   }
// }, [valueDebounce]);
// return {filteredOrders,setSearchQuery,searchQuery}
// }
export function searchFilterSucces (){
  const {succesService} = useLoaderData<typeof loader>();
  const [filteredOrders, setFilteredOrders] = useState(succesService);
  const [searchQuery, setSearchQuery] = useState('');
  const [valueDebounce] = useDebounce(searchQuery,1000)
  useEffect(() => {
    const toLowerCase = searchQuery.toLowerCase();
    if(toLowerCase.length > 2 ){
    const filtered = succesService.filter((order) => {
        const productNames = order.cart?.cartItems.map((item:any) => item.product?.name.toLowerCase()) ?? [];
        const invoiceNumber = order.invoiceNumber.toLowerCase();
        return (
          productNames.some((item) => item.includes(toLowerCase)) ||
          invoiceNumber.includes(toLowerCase)
        );
    });
    setFilteredOrders(filtered);
  }else{
    setFilteredOrders(succesService)
  }
}, [valueDebounce]);
return {filteredOrders,setSearchQuery,searchQuery}
}
