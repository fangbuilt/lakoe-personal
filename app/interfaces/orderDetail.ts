

export interface IOrderDetailInvoice {
  id: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  prices: number;
  discount: number;
  status: string;
  invoiceNumber: string;
  updatedAt: string;
  createdAt: string;
  courier: IOrderDetailCourier;
}

export interface IOrderDetailCourier {
  id: string;
  courierCode: string;
  courierServiceName: string;
  price: number;
}
