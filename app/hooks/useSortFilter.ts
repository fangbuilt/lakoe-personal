import { useState } from 'react';

export function useSortFilter() {
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null
  );

  const setSortOption = (option: string) => {
    setSelectedSortOption(option);
  };

  const getSelectedSortOption = () => {
    return selectedSortOption;
  };

  // Fungsi untuk mengurutkan pesanan berdasarkan opsi yang dipilih
  const sortOrders = (orders: any[]) => {
    if (selectedSortOption === 'Paling Baru') {
      return orders.slice().sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : null;
        const dateB = b.createdAt ? new Date(b.createdAt) : null;

        if (dateA && dateB) {
          return dateB.getTime() - dateA.getTime();
        }
        return 0; // Tambahkan penanganan jika createdAt adalah null atau undefined
      });
    } else if (selectedSortOption === 'Paling Lama') {
      return orders.slice().sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt) : null;
        const dateB = b.createdAt ? new Date(b.createdAt) : null;

        if (dateA && dateB) {
          return dateA.getTime() - dateB.getTime();
        }
        return 0; // Tambahkan penanganan jika createdAt adalah null atau undefined
      });
    }
    // Tambahkan logika pengurutan untuk opsi lain jika diperlukan
    return orders; // Default: tidak ada pengurutan
  };

  return {
    selectedSortOption,
    setSortOption,
    getSelectedSortOption,
    sortOrders, // Mengembalikan fungsi pengurutan
  };
}
