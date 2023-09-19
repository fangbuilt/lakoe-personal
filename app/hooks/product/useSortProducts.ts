import { useState } from 'react';

export function useSortProducts() {
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(
    null
  );

  const setSortOption = (option: string) => {
    setSelectedSortOption(option);
  };

  const getSelectedSortOption = () => {
    return selectedSortOption;
  };

  return { selectedSortOption, setSortOption, getSelectedSortOption };
}
