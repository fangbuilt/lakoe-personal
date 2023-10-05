// hooks/useFilterCourier.ts
import { useState } from 'react';

// Tipe data pesanan
export interface Order {
  id: number;
  courier: string;
  orderNumber: string;
}

// Tipe untuk hook useFilterCourier
export interface FilterCourierHook {
  selectedCouriers: string[];
  filterOrders: (orders: Order[]) => Order[];
  toggleCourier: (courier: string) => void;
  getSelectedCourierCount: () => number;
}

export function useFilterCourierBad(): FilterCourierHook {
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);

  const filterOrders = (orders: Order[]): Order[] => {
    return orders.filter((order: Order) => {
      return selectedCouriers.includes(order.courier);
    });
  };

  const toggleCourier = (courier: string) => {
    console.log('kurrrrrirrr', courier);
    if (selectedCouriers.includes(courier)) {
      setSelectedCouriers(selectedCouriers.filter((c) => c !== courier));
    } else {
      setSelectedCouriers([...selectedCouriers, courier]);
    }
  };

  const getSelectedCourierCount = () => selectedCouriers.length;

  return {
    selectedCouriers,
    filterOrders,
    toggleCourier,
    getSelectedCourierCount,
  };
}
