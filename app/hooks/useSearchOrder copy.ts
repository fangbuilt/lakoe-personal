import { useState, useEffect } from 'react';
import { PrismaClient } from '@prisma/client';
import type { IOrderDetailInvoice } from '~/interfaces/orderDetail';

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

export function UseSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState<IOrderDetailInvoice[]>(
    []
  );

  useEffect(() => {
    // Fungsi untuk mengambil data Invoice dari database berdasarkan pencarian
    async function fetchInvoices() {
      try {
        // Query untuk mengambil data Invoice sesuai dengan schema Prisma
        const invoices = await prisma.invoice.findMany({
          where: {
            OR: [
              {
                invoiceNumber: {
                  contains: searchQuery,
                  // mode: 'insensitive', // Membuat pencarian case-insensitive
                },
              },
              {
                receiverName: {
                  contains: searchQuery,
                  // mode: 'insensitive',
                },
              },
            ],
          },
        });

        // Set hasil pencarian ke state
        setFilteredOrders(invoices);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      }
    }

    // Panggil fungsi untuk mengambil data Invoice
    fetchInvoices();
  }, [searchQuery]);

  return { filteredOrders, setSearchQuery };
}
