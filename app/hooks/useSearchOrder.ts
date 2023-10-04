// import { useLoaderData } from '@remix-run/react';
// import { useState, useEffect } from 'react';
// import type { loader } from '~/routes/order';
// import useDebounce from './product/useDebounce';

// export default function useSearchFilter() {
//   const { canceledService } = useLoaderData<typeof loader>();
//   const [filteredOrders, setFilteredOrders] = useState(canceledService);
//   const [searchQuery, setSearchQuery] = useState('');
//   useEffect(() => {
//     const toLowerCase = searchQuery.toLowerCase();
//     const filtered = canceledService.filter((order) => {
//       const productNames =
//         order.cart?.cartItems.map((item: any) =>
//           item.product?.name.toLowerCase()
//         ) || [];
//       const invoiceNumber = order.invoiceNumber.toLowerCase();
//       return (
//         productNames.some((item) => item.includes(toLowerCase)) ||
//         invoiceNumber.includes(toLowerCase)
//       );
//     });
//     setFilteredOrders(filtered);
//   }, [searchQuery, canceledService]);
//   return { filteredOrders, setSearchQuery, searchQuery };
// }

// export function SearchFilterSucces() {

//   const { succesService } = useLoaderData<typeof loader>();
//   const [filteredOrders, setFilteredOrders] = useState(succesService);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [valueDebounce] = useDebounce(searchQuery, 1000);
//   useEffect(() => {
//     const toLowerCase = searchQuery.toLowerCase();
//     if (toLowerCase.length > 2) {
//       const filtered = succesService.filter((order) => {
//         const productNames =
//           order.cart?.cartItems.map((item: any) =>
//             item.product?.name.toLowerCase()
//           ) ?? [];
//         const invoiceNumber = order.invoiceNumber.toLowerCase();
//         return (
//           productNames.some((item) => item?.includes(toLowerCase)) ||
//           invoiceNumber.includes(toLowerCase)
//         );
//       });
//       setFilteredOrders(filtered);
//     } else {
//       setFilteredOrders(succesService);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [valueDebounce]);
//   return { filteredOrders, setSearchQuery, searchQuery };
// }
