import { useSteps } from "@chakra-ui/react";
import { useState } from "react";

export function useOrderDetalil() {
  const [isOrderHistoryVisible, setIsOrderHistoryVisible] = useState(false);

  const toggleOrderHistory = () => {
    setIsOrderHistoryVisible(!isOrderHistoryVisible);
  };

  const steps = [
    {
      id: "1",
      title: "Produk Telah Dikirim",
      description: "Sab, 10 Agu 2023 - 20:00 WIB",
    },

    {
      id: "2",
      title: "Pesanan Diproses",
      description: "Sab, 10 Agu 2023 - 20:00 WIB",
    },
    {
      id: "3",
      title: "Pembayaran Terverifikasi",
      description: "Sab, 10 Agu 2023 - 20:00 WIB",
    },

    {
      id: "4",
      title: "Pesanan Dibuat",
      description: "Sab, 10 Agu 2023 - 20:00 WIB",
    },
  ];

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return {
    isOrderHistoryVisible,
    toggleOrderHistory,
    steps,
    activeStep,
  };
}
