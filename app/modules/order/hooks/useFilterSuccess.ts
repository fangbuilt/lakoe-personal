import { useState, useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';

export default function UseFilterSuccess() {
  const { successedService } = useLoaderData<typeof loader>();
  const dataArray = Object.values(successedService);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrder, setFilteredOrder] = useState(dataArray);
  const [selectedCouriers, setSelectedCouriers] = useState<Courier[]>([]);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = dataArray.filter((items) => {
      const productName =
        items.cart?.cartItems
          .map((item) => item.product?.name?.toLowerCase())
          .flat() || [];
      const invoiceNumber = items.invoiceNumber?.toLowerCase() || '';
      const itemCourier = items.courier?.courierName?.toLowerCase() || '';
      console.log('Nama Kurir:', itemCourier);

      return (
        productName.some((name) => name && name.includes(lowerQuery)) ||
        invoiceNumber.includes(lowerQuery) ||
        itemCourier.includes(lowerQuery)
      );
    });
    setFilteredOrder(filtered);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, successedService]);

  type Courier = string;
  // Fungsi untuk menangani perubahan status checkbox kurir terpilih
  const handleCourierCheckboxChange = (courierName: Courier) => {
    // Salin array kurir terpilih untuk memodifikasinya
    const updatedSelectedCouriers = [...selectedCouriers];
    // Periksa apakah kurir sudah dipilih atau tidak
    if (updatedSelectedCouriers.includes(courierName)) {
      // Jika sudah dipilih, hilangkan dari array
      const index = updatedSelectedCouriers.indexOf(courierName);
      updatedSelectedCouriers.splice(index, 1);
    } else {
      // Jika belum dipilih, tambahkan ke array
      updatedSelectedCouriers.push(courierName);
    }
    // Perbarui state kurir terpilih
    setSelectedCouriers(updatedSelectedCouriers);
    // Perbarui pencarian dengan kurir terpilih
    setSearchQuery(updatedSelectedCouriers.join(' '));
  };
  const getSelectedCourier = () => {
    return selectedCouriers.length;
  };
  return {
    getSelectedCourier,
    filteredOrder,
    setSearchQuery,
    searchQuery,
    selectedCouriers,
    handleCourierCheckboxChange,
  };
}
