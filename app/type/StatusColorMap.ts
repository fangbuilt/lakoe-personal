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

export type StatusTemplateMessage = {
  [key: string]: string;
  UNPAID: any;
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
  ORDER_COMPLETED: '#909090',
};
// status
export const statusNameButton: StatusNameMap = {
  UNPAID: 'Belom Dibayar',
  IN_TRANSIT: 'Dalam Perjalanan',
  READY_TO_SHIP: 'Siap Dikirim',
  ORDER_SUCCES: 'Pesanan Selesai',
  ORDER_CANCELLED: 'Pesanan Dibatalkan',
  NEW_ORDER: 'Pesanan Baru',
  ORDER_COMPLETED: ' Pesanan Selesai',
};
//burron send
export const statusToSendBuyer: StatusSendMap = {
  UNPAID: ' Hubungi Pembali   ',
  IN_TRANSIT: 'Lihat Rincian Pengiriman',
  READY_TO_SHIP: 'Tracking Pengiriman',
  ORDER_SUCCES: ' Hubungi Pembeli ',
  ORDER_CANCELLED: 'Hubungi Pembeli',
  NEW_ORDER: 'Proses Pesanan',
  ORDER_COMPLETED: ' Pesanan Selesai',
};

export const statusToTemplate: StatusTemplateMessage = {
  UNPAID: 'UNPAID',
  IN_TRANSIT: 'IN_TRANSIT',
  READY_TO_SHIP: 'READY_TO_SHIP',
  ORDER_SUCCES: 'ORDER_SUCCES',
  ORDER_CANCELLED: 'ORDER_CANCELLED',
  NEW_ORDER: 'NEW_ORDER',
  ORDER_COMPLETED: 'ORDER_COMPLETED',
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

export type ItemTemplate = {
  status: keyof StatusTemplateMessage;
};
