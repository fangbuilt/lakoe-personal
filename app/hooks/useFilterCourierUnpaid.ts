import { useState } from 'react';
import { useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';

export interface Order {
  id: number;
  courier: string;
  orderNumber: string;
}
export function useFilterCourierUnpaid() {
  const { unpaidCard } = useLoaderData<typeof loader>();
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  //   const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  //   // const [searchResults, setSearchResults] = useState([]);
  //   const toggleCourier = (courier: string) => {
  //     if (selectedCouriers.includes(courier)) {
  //       setSelectedCouriers((prevSelected) =>
  //         prevSelected.filter((selected) => selected !== courier)
  //       );
  //     } else {
  //       setSelectedCouriers((prevSelected) => [...prevSelected, courier]);
  //     }
  //   };
  //   const getSelectedCourier = () => {
  //     return selectedCouriers.length;
  //   };

  //   return { selectedCouriers, toggleCourier, getSelectedCourier };
  // }

  // Fungsi untuk menerpkan filter berdasarkan kurir yang dipilih

  const toggleCourier = (courier: string) => {
    if (selectedCouriers.includes(courier)) {
      setSelectedCouriers(
        selectedCouriers.filter((selected) => selected !== courier)
      );
    } else {
      setSelectedCouriers([...selectedCouriers, courier]);
    }
  };

  const filteredOrdersList = unpaidCard.filter((order) => {
    const courierName = order.courier?.courierName;
    return courierName && selectedCouriers.includes(courierName);
  });
  const getSelectedCourier = () => {
    return selectedCouriers.length;
  };

  return {
    filteredOrdersList,
    getSelectedCourier,
    selectedCouriers,
    toggleCourier,
    setSelectedCouriers,
  };
}
