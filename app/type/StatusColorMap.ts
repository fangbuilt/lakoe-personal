export type StatusNameMap = {
  [key: string]: string;
  UNPAID: string;
  IN_TRANSIT: string;
  READY_TO_SHIP: string;
  ORDER_SUCCES: string;
  ORDER_CANCELLED: string;
  NEW_ORDER: string;
  ORDER_COMPLETED: string;
};

export type StatusColorMap = {
  [key: string]: string;
  UNPAID: string;
  IN_TRANSIT: string;
  READY_TO_SHIP: string;
  ORDER_SUCCES: string;
  ORDER_CANCELLED: string;
  NEW_ORDER: string;
  ORDER_COMPLETED: string;
};

export type StatusSendMap = {
  [key: string]: string;
  UNPAID: string;
  IN_TRANSIT: string;
  READY_TO_SHIP: string;
  ORDER_SUCCES: string;
  ORDER_CANCELLED: string;
  NEW_ORDER: string;
  ORDER_COMPLETED: string;
};
export const statusToColor: StatusColorMap = {
  UNPAID: '#E8C600',
  IN_TRANSIT: '#F68511',
  READY_TO_SHIP: '#147AF3',
  ORDER_SUCCES: '#E6E6E6',
  ORDER_CANCELLED: '#EA3829',
  NEW_ORDER: '#008F5D',
  ORDER_COMPLETED: '#E6E6E6',
};
export const statusNameButton: StatusNameMap = {
  UNPAID: 'Belom Dibayar',
  IN_TRANSIT: 'Dalam Perjalanan',
  READY_TO_SHIP: 'Siap Dikirim',
  ORDER_SUCCES: 'Pesanan Selesai',
  ORDER_CANCELLED: 'Pesanan Dibatalkan',
  NEW_ORDER: 'Pesanan Baru',
  ORDER_COMPLETED: ' Pesanan Selesai',
};

export const statusToSendBuyer: StatusSendMap = {
  UNPAID: '  Belom  Dibayar  ',
  IN_TRANSIT: 'Lihat Rincian Pengiriman',
  READY_TO_SHIP: 'Kabari Pembeli',
  ORDER_SUCCES: ' Hubungi Pembeli ',
  ORDER_CANCELLED: 'Hubungi Pembeli',
  NEW_ORDER: 'Proses Pesanan',
  ORDER_COMPLETED: ' Pesanan Selesai',
};
export type Item = {
  status: keyof StatusColorMap;
};
export type ItemSend = {
  status: keyof StatusSendMap;
};

export type ItemName = {
  status: keyof StatusNameMap;
};
