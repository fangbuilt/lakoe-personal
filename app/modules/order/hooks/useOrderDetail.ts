import { useSteps } from '@chakra-ui/react';
import { useState } from 'react';

export function useOrderDetail() {
  const [isOrderHistoryVisible, setIsOrderHistoryVisible] = useState(false);

  const toggleOrderHistory = () => {
    setIsOrderHistoryVisible(!isOrderHistoryVisible);
  };

  const steps = [
    {
      id: '1',
      title: 'Pembatalan Otomatis',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
    {
      id: '2',
      title: 'Produk Telah Diterima',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },

    {
      id: '3',
      title: 'Produk Telah Dikirim',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },

    {
      id: '4',
      title: 'Pesanan Diproses',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
    {
      id: '5',
      title: 'Pembayaran Terverifikasi',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },

    {
      id: '6',
      title: 'Pesanan Dibuat',
      description: 'Sab, 10 Agu 2023 - 20:00 WIB',
    },
  ];
  const filterStepsByStatus = (status: string) => {
    switch (status) {
      case 'UNPAID':
        return [steps[5]]; // Hanya "Pesanan Dibuat"
      case 'NEW_ORDER':
        return [steps[4], steps[5]]; // "Pembayaran Terverifikasi" dan "Pesanan Dibuat"
      case 'READY_TO_SHIP':
        return [steps[3], steps[4], steps[5]]; // "Pesanan Diproses", "Pembayaran Terverifikasi", dan "Pesanan Dibuat"
      case 'IN_TRANSIT':
        return [steps[2], steps[3], steps[4], steps[5]]; // "Produk Telah Dikirim", "Pesanan Diproses", "Pembayaran Terverifikasi", dan "Pesanan Dibuat"
      case 'ORDER_COMPLETED':
        return [steps[1], steps[2], steps[3], steps[4], steps[5]]; // "Produk Telah Diterima", "Produk Telah Dikirim", "Pesanan Diproses", "Pembayaran Terverifikasi", dan "Pesanan Dibuat"
      case 'ORDER_CANCELLED':
        return [steps[0], steps[5]]; // "Pembatalan Otomatis" dan "Pesanan Dibuat"
      default:
        return steps; // Default: Tampilkan semua langkah-langkah
    }
  };

  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return {
    filterStepsByStatus,
    isOrderHistoryVisible,
    toggleOrderHistory,
    steps,
    activeStep,
  };
}

export function formatCurrency(price: number): string {
  const formattedAmount = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return formattedAmount;
}

export function dateConversion(createdAt: Date): string {
  const dateObj = new Date(createdAt);
  const year = dateObj.getUTCFullYear();
  const day = String(dateObj.getUTCDate()).padStart(2, '0');
  const hour = String(dateObj.getUTCHours()).padStart(2, '0');
  const minute = String(dateObj.getUTCMinutes()).padStart(2, '0');

  const namaBulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  const namaBulanTeks = namaBulan[dateObj.getUTCMonth()];

  return `${day} ${namaBulanTeks} ${year} ${hour}:${minute}`;
}
