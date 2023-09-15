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
  invoiceHistories: IOrderDetailInvoiceHistory[];
}

export interface IOrderDetailInvoiceHistory {
  id: string;
  status: string;
  createdAt: string;
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
  variantOption: IOrderDetailVariantOption;
}

export interface IOrderDetailVariantOption {
  id: string;
  variantId: string;
  variantOptionValues: IOrderDetailVariantOptionValue[];
}

export interface IOrderDetailVariantOptionValue {
  id: string;
  price: number;
}

export interface IOrderDetailProduct {
  id: string;
  name: string;
  attachments: IOrderDetailAttachment[];
  cartItems: IOrderDetailCartItem[];
}

export interface IOrderDetailUser {
  id: string;
}

export interface IOrderDetailAttachment {
  id: string;
  url: string;
}
