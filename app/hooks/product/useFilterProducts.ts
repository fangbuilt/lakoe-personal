import { useState } from 'react';

export function useFilterProducts() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories((prevSelected) => [...prevSelected, category]);
    }
  };

  const getSelectedCategoryCount = () => {
    return selectedCategories.length;
  };

  return { selectedCategories, toggleCategory, getSelectedCategoryCount };
}
