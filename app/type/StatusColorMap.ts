export type StatusColorMap = {
  [key: string]: string;
  UNPAID: string;
  IN_TRANSIT: string;
  READY_TO_SHIP: string;
  ORDER_COMPLETED: string;
  ORDER_CANCELLED: string;
  NEW_ORDER: string;
};

export const statusToColor: StatusColorMap = {
  UNPAID: '#E8C600',
  IN_TRANSIT: '#F68511',
  READY_TO_SHIP: '#147AF3',
  ORDER_COMPLETED: '#E6E6E6',
  ORDER_CANCELLED: '#EA3829',
  NEW_ORDER: '#008F5D',
};

export type Item = {
  status: keyof StatusColorMap;
};
