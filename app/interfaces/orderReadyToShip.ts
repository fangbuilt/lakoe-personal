export interface IOrderReadyToShipInvoice {
  id: string;
  invoiceNumber: string;
  cart: IOrderReadyToShipCart;
  courier: IOrderReadyToShipCourier;
}

export interface IOrderReadyToShipCart {
  id: string;
  price: number;
  user: IOrderReadyToShipUser;
  cartItems: IOrderReadyToShipCartItem[];
}

export interface IOrderReadyToShipCartItem {
  id: string;
  qty: number;
  price: number;
  product: IOrderReadyToShipProduct;
}

export interface IOrderReadyToShipProduct {
  id: string;
  name: string;
}

export interface IOrderReadyToShipCourier {
  id: string;
  courierCode: string;
}

export interface IOrderReadyToShipUser {
  id: string;
}
