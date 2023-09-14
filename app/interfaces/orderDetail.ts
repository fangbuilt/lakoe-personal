export interface IOrderDetailInvoice {
  id: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  price: number;
  discount: number;
  status: string;
  invoiceNumber: string;
  updatedAt: string;
  createdAt: string;
  waybill: string;
  courier: IOrderDetailCourier;
  cart: IOrderDetailCart;
  
}

export interface IOrderDetailCourier {
  id: string;
  courierCode: string;
  courierServiceCode: string;
  price: number;
}

export interface IOrderDetailCart {
  id: string;
  price: number;
}

