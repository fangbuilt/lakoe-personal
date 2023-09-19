import { useState } from 'react';

type Category = {
  id: number;
  parentId: number | null;
  name: string;
};

type CategoryNames = {
  grandparent: string | null;
  parent: string | null;
  child: string | null;
};

export default function useNestedOptions() {
  const options = [
    {
      id: 1,
      parentId: null,
      name: 'Audio dan Kamera',
    },
    {
      id: 2,
      parentId: null,
      name: 'Buku',
    },
    {
      id: 3,
      parentId: null,
      name: 'Dapur',
    },
    {
      id: 4,
      parentId: null,
      name: 'Elektronik',
    },
    {
      id: 5,
      parentId: null,
      name: 'Fashion Anak dan Bayi',
    },
    {
      id: 6,
      parentId: null,
      name: 'Fashion Muslim',
    },
    {
      id: 7,
      parentId: null,
      name: 'Fashion Pria',
    },
    {
      id: 8,
      parentId: null,
      name: 'Fashion Wanita',
    },
    {
      id: 9,
      parentId: null,
      name: 'Handphone dan Tablet',
    },
    {
      id: 10,
      parentId: 1,
      name: 'Audio',
    },
    {
      id: 11,
      parentId: 1,
      name: 'Kamera Digital',
    },
    {
      id: 12,
      parentId: 1,
      name: 'Lighting dan Studio',
    },
    {
      id: 13,
      parentId: 2,
      name: 'Buku Import',
    },
    {
      id: 14,
      parentId: 2,
      name: 'Komik',
    },
    {
      id: 15,
      parentId: 2,
      name: 'Novel dan Sastra',
    },
    {
      id: 16,
      parentId: 3,
      name: 'Peralatan Baking',
    },
    {
      id: 17,
      parentId: 3,
      name: 'Peralatan Dapur',
    },
    {
      id: 18,
      parentId: 3,
      name: 'Peralatan Masak',
    },
    {
      id: 19,
      parentId: 4,
      name: 'Alat Pendingin Ruangan',
    },
    {
      id: 20,
      parentId: 4,
      name: 'Elektronik Rumah Tangga',
    },
    {
      id: 21,
      parentId: 4,
      name: 'TV dan Aksesoris',
    },
    {
      id: 22,
      parentId: 5,
      name: 'Aksesoris Bayi',
    },
    {
      id: 23,
      parentId: 5,
      name: 'Pakaian Anak Laki-Laki',
    },
    {
      id: 24,
      parentId: 5,
      name: 'Pakaian Anak Perempuan',
    },
    {
      id: 25,
      parentId: 6,
      name: 'Jilbab',
    },
    {
      id: 26,
      parentId: 6,
      name: 'Pakaian Muslim Anak',
    },
    {
      id: 27,
      parentId: 6,
      name: 'Pakaian Muslim Pria',
    },
    {
      id: 28,
      parentId: 7,
      name: 'Atasan Pria',
    },
    {
      id: 29,
      parentId: 7,
      name: 'Blazer dan Jas Pria',
    },
    {
      id: 30,
      parentId: 7,
      name: 'Celana Pria',
    },
    {
      id: 31,
      parentId: 8,
      name: 'Aksesoris Wanita',
    },
    {
      id: 32,
      parentId: 8,
      name: 'Atasan Wanita',
    },
    {
      id: 33,
      parentId: 8,
      name: 'Bawahan Wanita',
    },
    {
      id: 34,
      parentId: 9,
      name: 'Handphone',
    },
    {
      id: 35,
      parentId: 9,
      name: 'Tablet',
    },
    {
      id: 36,
      parentId: 9,
      name: 'Wearable Devices',
    },
    {
      id: 37,
      parentId: 10,
      name: 'Earphone',
    },
    {
      id: 38,
      parentId: 10,
      name: 'Headphone',
    },
    {
      id: 39,
      parentId: 10,
      name: 'TWS',
    },
    {
      id: 40,
      parentId: 11,
      name: 'Action Camera',
    },
    {
      id: 41,
      parentId: 11,
      name: 'Kamera DSLR',
    },
    {
      id: 42,
      parentId: 11,
      name: 'Kamera Mirrorless',
    },
    {
      id: 43,
      parentId: 12,
      name: 'Backdrop',
    },
    {
      id: 44,
      parentId: 12,
      name: 'Flash Diffuser',
    },
    {
      id: 45,
      parentId: 12,
      name: 'Flash Kamera',
    },
    {
      id: 46,
      parentId: 13,
      name: 'Self Development Book Import',
    },
    {
      id: 47,
      parentId: 13,
      name: 'Technique Book Import',
    },
    {
      id: 48,
      parentId: 13,
      name: 'Tourism and Map Book Import',
    },
    {
      id: 49,
      parentId: 14,
      name: 'Komik Anak',
    },
    {
      id: 50,
      parentId: 14,
      name: 'Komik Asing',
    },
    {
      id: 51,
      parentId: 14,
      name: 'Komik Manga',
    },
    {
      id: 52,
      parentId: 15,
      name: 'Buku Roman',
    },
    {
      id: 53,
      parentId: 15,
      name: 'Fantasi',
    },
    {
      id: 54,
      parentId: 15,
      name: 'Misteri',
    },
    {
      id: 55,
      parentId: 16,
      name: 'Alat Penghias Kue',
    },
    {
      id: 56,
      parentId: 16,
      name: 'Cetakan Kue',
    },
    {
      id: 57,
      parentId: 16,
      name: 'Kertas Baking',
    },
    {
      id: 58,
      parentId: 17,
      name: 'Dispenser Air',
    },
    {
      id: 59,
      parentId: 17,
      name: 'Pompa Galon',
    },
    {
      id: 60,
      parentId: 17,
      name: 'Rak Dapur',
    },
    {
      id: 61,
      parentId: 18,
      name: 'Cobek',
    },
    {
      id: 62,
      parentId: 18,
      name: 'Deep Fryer',
    },
    {
      id: 63,
      parentId: 18,
      name: 'Kompor',
    },
    {
      id: 64,
      parentId: 19,
      name: 'AC Portable',
    },
    {
      id: 65,
      parentId: 19,
      name: 'Air Conditioner',
    },
    {
      id: 66,
      parentId: 19,
      name: 'Air Purifier',
    },
    {
      id: 67,
      parentId: 20,
      name: 'Mesin Cuci',
    },
    {
      id: 68,
      parentId: 20,
      name: 'Setrika',
    },
    {
      id: 69,
      parentId: 20,
      name: 'Vacuum Cleaner',
    },
    {
      id: 70,
      parentId: 21,
      name: 'Remote TV',
    },
    {
      id: 71,
      parentId: 21,
      name: 'TV Box',
    },
    {
      id: 72,
      parentId: 21,
      name: 'Televisi',
    },
    {
      id: 73,
      parentId: 22,
      name: 'Kacamata Jemur Bayi',
    },
    {
      id: 74,
      parentId: 22,
      name: 'Perhiasan Bayi',
    },
    {
      id: 75,
      parentId: 22,
      name: 'Topi Bayi',
    },
    {
      id: 76,
      parentId: 23,
      name: 'Celana Jogger Anak Laki-Laki',
    },
    {
      id: 77,
      parentId: 23,
      name: 'Kaos Anak Laki-Laki',
    },
    {
      id: 78,
      parentId: 23,
      name: 'Kemaja Anak Laki-Laki',
    },
    {
      id: 79,
      parentId: 24,
      name: 'Baju Ballet Anak Perempuan',
    },
    {
      id: 80,
      parentId: 24,
      name: 'Blouse Anak Perempuan',
    },
    {
      id: 81,
      parentId: 24,
      name: 'Rok Anak Perempuan',
    },
    {
      id: 82,
      parentId: 25,
      name: 'Ciput',
    },
    {
      id: 83,
      parentId: 25,
      name: 'Hijab Instan',
    },
    {
      id: 84,
      parentId: 25,
      name: 'Pashmina',
    },
    {
      id: 85,
      parentId: 26,
      name: 'Baju Koko Anak',
    },
    {
      id: 86,
      parentId: 26,
      name: 'Gamis Anak',
    },
    {
      id: 87,
      parentId: 26,
      name: 'Peci Anak',
    },
    {
      id: 88,
      parentId: 27,
      name: 'Baju Koko Pria',
    },
    {
      id: 89,
      parentId: 27,
      name: 'Celana Sarung',
    },
    {
      id: 90,
      parentId: 27,
      name: 'Peci dan Kopiah',
    },
    {
      id: 91,
      parentId: 28,
      name: 'Kaos Polo Pria',
    },
    {
      id: 92,
      parentId: 28,
      name: 'Kaos Pria',
    },
    {
      id: 93,
      parentId: 28,
      name: 'Kemeja Pria',
    },
    {
      id: 94,
      parentId: 29,
      name: 'Blazer Pria',
    },
    {
      id: 95,
      parentId: 29,
      name: 'Jas dan Tuxedo Pria',
    },
    {
      id: 96,
      parentId: 29,
      name: 'Pin Jas',
    },
    {
      id: 97,
      parentId: 30,
      name: 'Celana Kargo Pria',
    },
    {
      id: 98,
      parentId: 30,
      name: 'Celana Chino Pria',
    },
    {
      id: 99,
      parentId: 30,
      name: 'Celana Pendek Pria',
    },
    {
      id: 100,
      parentId: 31,
      name: 'Ikat Pinggang Wanita',
    },
    {
      id: 101,
      parentId: 31,
      name: 'Sarung Tangan Wanita',
    },
    {
      id: 102,
      parentId: 31,
      name: 'Scarf dan Shawl Wanita',
    },
    {
      id: 103,
      parentId: 32,
      name: 'Blouse Wanita',
    },
    {
      id: 104,
      parentId: 32,
      name: 'Crop Top Wanita',
    },
    {
      id: 105,
      parentId: 32,
      name: 'Tank Top Wanita',
    },
    {
      id: 106,
      parentId: 33,
      name: 'Celana Panjang Wanita',
    },
    {
      id: 107,
      parentId: 33,
      name: 'Celana Pendek Wanita',
    },
    {
      id: 108,
      parentId: 33,
      name: 'Rok Wanita',
    },
    {
      id: 109,
      parentId: 34,
      name: 'Android OS',
    },
    {
      id: 110,
      parentId: 34,
      name: 'Feature Phone',
    },
    {
      id: 111,
      parentId: 34,
      name: 'iOS',
    },
    {
      id: 112,
      parentId: 35,
      name: 'Android OS',
    },
    {
      id: 113,
      parentId: 35,
      name: 'Kindle e-Book',
    },
    {
      id: 114,
      parentId: 35,
      name: 'iOS',
    },
    {
      id: 115,
      parentId: 36,
      name: 'Smart Band',
    },
    {
      id: 116,
      parentId: 36,
      name: 'Smart Watch',
    },
    {
      id: 117,
      parentId: 36,
      name: 'Wearable Camera',
    },
  ];

  const initialSelected: CategoryNames = {
    grandparent: null,
    parent: null,
    child: null,
  };

  const [grandParentData, setGrandParentData] = useState<Category[]>([]);
  const [parentData, setParentData] = useState<Category[]>([]);
  const [childData, setChildData] = useState<Category[]>([]);
  const [selected, setSelected] = useState<CategoryNames>(initialSelected);
  const [activeGrandparent, setActiveGrandparent] = useState<number | null>(
    null
  );
  const [activeParent, setActiveParent] = useState<number | null>(null);
  const [activeChild, setActiveChild] = useState<number | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [openOptions, setOpenOptions] = useState(false);

  const handleCategoryClick = (id: number, type: keyof CategoryNames) => {
    if (type === 'grandparent') {
      setActiveGrandparent(id);
      setActiveParent(id);
      setActiveChild(null);
      const newCategoryData = options.filter(
        (option) => option.parentId === id
      );
      setParentData([]);
      setGrandParentData(newCategoryData);
    } else if (type === 'parent') {
      setActiveParent(id);
      setActiveChild(null);
      const newCategoryData = options.filter(
        (option) => option.parentId === id
      );
      setParentData(newCategoryData);
    } else if (type === 'child') {
      setActiveChild(id);
      const newCategoryData = options.filter(
        (option) => option.parentId === id
      );
      setChildData(newCategoryData);
      setValue(options.find((option) => option.id === id)?.name || null);
      setOpenOptions(false);
    }

    const categoryName =
      options.find((option) => option.id === id)?.name || null;
    setSelected((prevState) => ({
      ...prevState,
      [type]: categoryName,
    }));
  };

  const toggleOptions = () => {
    setOpenOptions(!openOptions);
  };

  const parentOptions = options.filter((option) => option.parentId === null);

  return {
    handleCategoryClick,
    options,
    parentOptions,
    grandParentData,
    parentData,
    childData,
    selected,
    toggleOptions,
    openOptions,
    value,
    activeGrandparent,
    activeParent,
    activeChild,
  };
}
