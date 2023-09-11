export interface IOrderDetailInvoice {
  id: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  price: number;
  discount: number;
  status: string;
  invoiceNumber: string;
  waybill: string;
  updatedAt: string;
  createdAt: string;
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
  user: IOrderDetailUser;
  cartItems: IOrderDetailCartItem[];
}

export interface IOrderDetailCartItem {
  id: string;
  price: number;
  qty: number;
  product: IOrderDetailProduct;
}

export interface IOrderDetailProduct {
  id: string;
  name: string;
  attachments: string[];
  cartItems: IOrderDetailCartItem[];
}

export interface IOrderDetailUser {
  id: string;
}
