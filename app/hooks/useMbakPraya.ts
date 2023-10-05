import { useState } from 'react';

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Fungsi untuk membuka modal
  const openModal = (trackingId: string, id: string) => {
    setSelectedCardId(trackingId);
    setIsModalOpen(true);
  };

  // Fungsi untuk menutup modal tanpa parameter
  const closeModal = () => {
    setSelectedCardId(null);
    setIsModalOpen(false);
  };

  // Fungsi untuk menutup modal dengan parameter ID
  const closeCardModal = (id: string) => {
    setSelectedCardId(null);
    setIsModalOpen(false);
    // Tambahkan logika tambahan sesuai kebutuhan
  };

  return {
    isModalOpen,
    selectedCardId,
    openModal,
    closeModal,
    closeCardModal,
  };
}
