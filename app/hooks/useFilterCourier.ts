import { useState } from 'react';
import UseSearchAll from './useSearchOrderAll';

export interface Order {
  id: number;
  courier: string;
  orderNumber: string;
}
export function useFilterCourier() {
  const { filteredOrders } = UseSearchAll();
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

  const toggleCourier = (courier: string) => {
    if (selectedCouriers.includes(courier)) {
      setSelectedCouriers((prevCouriers) =>
        prevCouriers.filter((selected) => selected !== courier)
      );
    } else {
      setSelectedCouriers((prevCouriers) => [...prevCouriers, courier]);
    }
  };

  const filteredOrdersList = filteredOrders.filter((order) => {
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
