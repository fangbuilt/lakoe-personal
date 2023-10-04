import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import type { loader } from '~/routes/order';
// import UseSearchAll from './useSearchOrderAll';

export function useFilterCourier() {
  const { unpaidCard } = useLoaderData<typeof loader>();
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([]);
  const toggleCourier = (courier: string) => {
    if (selectedCouriers.includes(courier)) {
      setSelectedCouriers((prevSelected) =>
        prevSelected.filter((selected) => selected !== courier)
      );
    } else {
      setSelectedCouriers((prevSelected) => [...prevSelected, courier]);
    }
  };

  unpaidCard.filter((order: any) => {
    const courierName = order.courier?.courierName;
    return courierName && selectedCouriers.includes(courierName);
  });
  const getSelectedCourier = () => {
    return selectedCouriers.length;
  };

  return { selectedCouriers, toggleCourier, getSelectedCourier };
}
