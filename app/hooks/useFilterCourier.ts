import { useState} from "react";

export function useFilterCourier(){
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
    const getSelectedCourier = () => {
      return selectedCouriers.length;
    };

return{selectedCouriers, toggleCourier, getSelectedCourier}

}
