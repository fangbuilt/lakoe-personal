export interface IOrderDetailUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  store: IOrderDetailStore;
  storeId: string;
  role: IOrderDetailRole;
  roleId: string;
  profile: IOrderDetailProfile;
  biteshipTrackingLimits: IOrderDetailBiteshipTrackingLimit[];
  carts: IOrderDetailCart[];
  cartItems: IOrderDetailCartItem[];
  invoices: IOrderDetailInvoice[];
  payments: IOrderDetailPayment[];
  withdraws: IOrderDetailWithdraw[];
  createdAt: Date;
  updatedAt: Date;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  price: number;
  discount: number;
  status: string;
  invoiceNumber: string;
  waybill: string;
  courier: IOrderDetailCourier;
  cart: IOrderDetailCart;
}

export interface IOrderDetailWithdraw {
  id: string;
  amount: number;
  status: string;
  store: IOrderDetailStore;
  storeId: string;
  bankAccount: IOrderDetailBankAccount;
  bankId: string;
  approvedBy: IOrderDetailUser;
  approvedById: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailRole {
  id: string;
  name: string;
  users: IOrderDetailUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailProfile {
  id: string;
  user: IOrderDetailUser;
  userId: string;
  locations: IOrderDetailLocation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailStore {
  id: string;
  name: string;
  credit: number;
  slogan: string;
  description: string;
  domain: string;
  logoAttachment: string;
  bannerAttachment: string;
  users: IOrderDetailUser[];
  storesDecorations: IOrderDetailStoreDecoration[];
  operationHours: IOrderDetailOperationHour[];
  messageTemplates: IOrderDetailMessageTemplate[];
  locations: IOrderDetailLocation[];
  products: IOrderDetailProduct[];
  carts: IOrderDetailCart[];
  bankAccounts: IOrderDetailBankAccount[];
  withdraws: IOrderDetailWithdraw[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailDecoration {
  id: string;
  type: string;
  storesDecorations: IOrderDetailStoreDecoration[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailStoreDecoration {
  id: string;
  store: IOrderDetailStore;
  storeId: string;
  decoration: IOrderDetailDecoration;
  decorationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailOperationHour {
  id: string;
  day: string;
  openAt: Date;
  closeAt: Date;
  isOff: boolean;
  store: IOrderDetailStore;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailMessageTemplate {
  id: string;
  name: string;
  content: string;
  store: IOrderDetailStore;
  storeId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailLocation {
  id: string;
  name: string;
  address: string;
  addressNote: string;
  latitude: string;
  longtitude: string;
  postalCode: string;
  cityDistrict: string;
  isMainLocation: boolean;
  store: IOrderDetailStore;
  storeId: string;
  profile: IOrderDetailProfile;
  profileId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailProduct {
  id: string;
  name: string;
  description: string;
  minimumOrder: number;
  length: number;
  width: number;
  height: number;
  slug: string;
  isActive: boolean;
  store: IOrderDetailStore;
  storeId: string;
  category: IOrderDetailCategory;
  categoryId: string;
  attachments: IOrderDetailProductAttachment[];
  variants: IOrderDetailVariant[];
  cartItems: IOrderDetailCartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailVariant {
  id: string;
  name: string;
  isActive: boolean;
  product: IOrderDetailProduct;
  productId: string;
  variantOptions: IOrderDetailVariantOption[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailVariantOption {
  id: string;
  name: string;
  variant: IOrderDetailVariant;
  variantId: string;
  cartItems: IOrderDetailCartItem[];
  variantOptionValues: IOrderDetailVariantOptionValue[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailVariantOptionValue {
  id: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  variantOption: IOrderDetailVariantOption;
  variantOptionId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailCategory {
  id: string;
  name: string;
  parentId: string;
  products: IOrderDetailProduct[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailCart {
  id: string;
  price: number;
  discount: number;
  user: IOrderDetailUser;
  userId: string;
  store: IOrderDetailStore;
  storeId: string;
  cartItems: IOrderDetailCartItem[];
  invoices: IOrderDetailInvoice[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailCartItem {
  id: string;
  qty: number;
  price: number;
  variantOption: IOrderDetailVariantOption;
  variantOptionId: string;
  cart: IOrderDetailCart;
  cartId: string;
  user: IOrderDetailUser;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  product: IOrderDetailProduct;
  productId: string;
}

export interface IOrderDetailInvoice {
  id: string;
  price: number;
  discount: number;
  status: string;
  receiverLongitude: string;
  receiverLatitude: string;
  receiverDistrict: string;
  receiverPhone: string;
  receiverAddress: string;
  receiverName: string;
  receiverEmail: string;
  receiverPostalCode: string;
  receiverAddressNote: string;
  invoiceNumber: string;
  waybill: string;
  mootaTransactionId: string;
  confirmationPayment: IOrderDetailConfirmationPayment;
  cart: IOrderDetailCart;
  cartId: string;
  courier: IOrderDetailCourier;
  courierId: string;
  user: IOrderDetailUser;
  userId: string;
  payment: IOrderDetailPayment;
  paymentId: string;
  biteshipTrackinglimits: IOrderDetailBiteshipTrackingLimit;
  invoiceHistories: IOrderDetailInvoiceHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailPayment {
  id: string;
  bank: string;
  amount: number;
  status: string;
  user: IOrderDetailUser;
  userId: string;
  invoices: IOrderDetailInvoice[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailCourier {
  id: string;
  availableForCashOnDelivery: boolean;
  availableForProofOfDelivery: boolean;
  availableForInstantWaybillId: boolean;
  courierType: string;
  courierInsurance: string;
  courierName: string;
  courierCode: string;
  courierServiceName: string;
  courierServiceCode: string;
  tier: string;
  description: string;
  serviceType: string;
  shippingType: string;
  shipmentDurationRange: string;
  shipmentDurationUnit: string;
  price: number;
  orderId: string;
  trackingId: string;
  deliveryDate: string;
  deliveryTime: string;
  invoices: IOrderDetailInvoice[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailInvoiceHistory {
  id: string;
  status: string;
  invoice: IOrderDetailInvoice;
  invoiceId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailBankAccount {
  id: string;
  bank: string;
  accountName: string;
  accountNumber: string;
  store: IOrderDetailStore;
  storeId: string;
  withdraws: IOrderDetailWithdraw[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailProductAttachment {
  id: string;
  url: string;
}

export interface IOrderDetailConfirmationPayment {
  id: string;
  amount: number;
  attachment: string;
  invoice: IOrderDetailInvoice;
  invoiceId: string;
  bank: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderDetailBiteshipTrackingLimit {
  id: string;
  user: IOrderDetailUser;
  userId: string;
  invoice: IOrderDetailInvoice;
  invoiceId: string;
  nextAccessTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
