import { useState, useEffect } from 'react';
import { useLoaderData } from '@remix-run/react';
import type { loader } from '~/routes/order';

export default function UseFilterCanceled() {
  const { canceledService } = useLoaderData<typeof loader>();
  const dataArray = Object.values(canceledService);
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
  }, [searchQuery, canceledService]);

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

export function UseSearchProductUnpaid() {
  const { unpaidCard } = useLoaderData<typeof loader>();
  const dataArray = Object.values(unpaidCard);
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
  }, [searchQuery, unpaidCard]);

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

export function UseFilterSucces() {
  const { succesService } = useLoaderData<typeof loader>();
  const dataArray = Object.values(succesService);
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
  }, [searchQuery, succesService]);

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

export function UseFilterInShipping() {
  const { dataShipping } = useLoaderData<typeof loader>();
  const dataArray = Object.values(dataShipping);
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
  }, [searchQuery, dataShipping]);

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

export function UseFilterReadyToShip() {
  const { dataProductReadyToShip } = useLoaderData<typeof loader>();
  const dataArray = Object.values(dataProductReadyToShip);
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
  }, [searchQuery, dataProductReadyToShip]);

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

export function UseFilterNewOrder() {
  const { dataInvoice } = useLoaderData<typeof loader>();
  const dataArray = Object.values(dataInvoice);
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
  }, [searchQuery, dataInvoice]);

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
