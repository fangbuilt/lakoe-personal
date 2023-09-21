import { useSteps } from '@chakra-ui/react';
// import { useState } from "react";

const useDetailPengiriman = () => {
  const step = [
    {
      id: 1,
      title: 'RECEIVED AT INBOUND STATION [JAKRATA, HUB VETERAN BINTARO]',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
    {
      id: 2,
      title:
        'SHIPMENT FORWARDER TO DESTINATION [JAKARTA, HUB VETTERAN JAKARTA]',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
    {
      id: 3,
      title: 'Pesanan Diproses',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
    {
      id: 4,
      title: 'RECEIVED AT SORTING CENTRE [JAKARTA]',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
    {
      id: 5,
      title: 'SHIPMENT RECEIVED BY JNE COUNTER OFFICE [JAKARTA]',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
  ];
  const { activeStep } = useSteps({
    index: 1,
    count: step.length,
  });

  return {
    step,
    activeStep,
  };
};

export default useDetailPengiriman;
