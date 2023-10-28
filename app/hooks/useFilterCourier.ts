import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { loader } from '~/routes/order';
// import UseSearchAll from './useSearchOrderAll';

export interface Order {
  id: number;
  courier: string;
  orderNumber: string;
}
export function useFilterCourier() {
  const { unpaidCard } = useLoaderData<typeof loader>();
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

  const toggleCourier = (courier: string) => {
    if (selectedCouriers.includes(courier)) {
      setSelectedCouriers(
        selectedCouriers.filter((selected) => selected !== courier)
      );
    } else {
      setSelectedCouriers([...selectedCouriers, courier]);
    }
  };

  const filteredOrdersList = unpaidCard.filter((order: any) => {
    const courierName = order.courier?.courierName;

    return courierName && selectedCouriers.includes(courierName);
  });
  const getSelectedCourier = () => {
    return selectedCouriers.length;
  };

  return {
    filteredOrdersList,
    getSelectedCourier,
    selectedCouriers: selectedCouriers as Array<string>,
    toggleCourier,
    setSelectedCouriers,
  };
}
// hooks/useFilterCourier.ts
// import { useLoaderData } from "@remix-run/react";
// import { useState } from "react";
// import { loader } from "~/routes/order";

// export function useFilterCourier() {
//   const {canceledService} = useLoaderData<typeof loader>();

//   const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

//   const toggleCourier = (courier: string) => {
//     // Check if the courier is already selected
//     if (selectedCouriers.includes(courier)) {
//       setSelectedCouriers(selectedCouriers.filter((c) => c !== courier));
//     } else {
//       setSelectedCouriers([...selectedCouriers, courier]);
//     }
//   };

//   const getSelectedCourier = () => selectedCouriers.length;

//   return { selectedCouriers, toggleCourier, getSelectedCourier };
// }
