export interface IOrderDetailUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  store?: IOrderDetailStore | null;
  storeId?: string | null;
  role?: IOrderDetailRole | null;
  roleId: string;
  profile?: IOrderDetailProfile | null;
  biteshipTrackingLimits: IOrderDetailBiteshipTrackingLimit[];
  carts: IOrderDetailCart[];
  cartItems: IOrderDetailCartItem[];
  invoices: IOrderDetailInvoice[];
  payments: IOrderDetailPayment[];
  withdraws: IOrderDetailWithdraw[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailWithdraw {
  id: string;
  amount: number;
  status: string;
  store?: IOrderDetailStore | null;
  storeId: string;
  bankAccount?: IOrderDetailBankAccount | null;
  bankId: string;
  approvedBy?: IOrderDetailUser | null;
  approvedById: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailRole {
  id: string;
  name: string;
  users: IOrderDetailUser[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailProfile {
  id: string;
  user?: IOrderDetailUser | null;
  userId: string;
  locations: IOrderDetailLocation[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailStore {
  id: string;
  name: string;
  credit: number;
  slogan?: string | null;
  description: string;
  domain: string;
  logoAttachment?: string | null;
  bannerAttachment?: string | null;
  users: IOrderDetailUser[];
  storesDecorations: IOrderDetailStoreDecoration[];
  operationHours: IOrderDetailOperationHour[];
  messageTemplates: IOrderDetailMessageTemplate[];
  locations: IOrderDetailLocation[];
  products: IOrderDetailProduct[];
  carts: IOrderDetailCart[];
  cartItems: IOrderDetailCartItem[];
  bankAccounts: IOrderDetailBankAccount[];
  withdraws: IOrderDetailWithdraw[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailDecoration {
  id: string;
  type: string;
  storesDecorations: IOrderDetailStoreDecoration[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailStoreDecoration {
  id: string;
  store?: IOrderDetailStore | null;
  storeId: string;
  decoration?: IOrderDetailDecoration | null;
  decorationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailOperationHour {
  id: string;
  day: string;
  openAt: string;
  closeAt: string;
  isOff: boolean;
  store?: IOrderDetailStore | null;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailMessageTemplate {
  id: string;
  name: string;
  content: string;
  store?: IOrderDetailStore | null;
  storeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailLocation {
  id: string;
  name: string;
  address: string;
  addressNote?: string | null;
  latitude: string;
  longtitude: string;
  postalCode: string;
  cityDistrict: string;
  isMainLocation: boolean;
  store?: IOrderDetailStore | null;
  storeId: string;
  profile?: IOrderDetailProfile | null;
  profileId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailProduct {
  id: string;
  name: string;
  description: string;
  minumumOrder: number;
  slug: string;
  isActive: boolean;
  store?: IOrderDetailStore | null;
  storeId: string;
  category?: IOrderDetailCategory | null;
  categoryId: string;
  attachments: IOrderDetailProductAttachment[];
  variants: IOrderDetailVariant[];
  cartItems: IOrderDetailCartItem[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailVariant {
  id: string;
  name: string;
  isActive: boolean;
  product?: IOrderDetailProduct | null;
  productId: string;
  variantOptions: IOrderDetailVariantOption[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailVariantOption {
  id: string;
  name: string;
  variant?: IOrderDetailVariant | null;
  variantId: string;
  variantOptionValues: IOrderDetailVariantOptionValue[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailVariantOptionValue {
  id: string;
  sku: string;
  weight: number;
  stock: number;
  price: number;
  variantOption?: IOrderDetailVariantOption | null;
  variantOptionId: string;
  size?: IOrderDetailVariantOptionValueSize | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailVariantOptionValueSize {
  id: string;
  length: number;
  width: number;
  height: number;
  variantOptionValue?: IOrderDetailVariantOptionValue | null;
  variantOptionValueId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailCategory {
  id: string;
  name: string;
  parentId?: string | null;
  products: IOrderDetailProduct[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailCart {
  id: string;
  price: number;
  discount: number;
  confirmationPayment?: IOrderDetailConfirmationPayment | null;
  user?: IOrderDetailUser | null;
  userId: string;
  store?: IOrderDetailStore | null;
  storeId: string;
  payment?: IOrderDetailPayment | null;
  paymentId: string;
  cartItems: IOrderDetailCartItem[];
  invoices: IOrderDetailInvoice[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailCartItem {
  id: string;
  qty: number;
  price: number;
  product?: IOrderDetailProduct | null;
  productId: string;
  cart?: IOrderDetailCart | null;
  cartId: string;
  store?: IOrderDetailStore | null;
  storeId: string;
  user?: IOrderDetailUser | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
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
  receiverAddressNote?: string | null;
  invoiceNumber: string;
  waybill: string;
  mootaTransactionId: string;
  cart?: IOrderDetailCart | null;
  cartId: string;
  courier?: IOrderDetailCourier | null;
  courierId: string;
  user?: IOrderDetailUser | null;
  userId: string;
  payment?: IOrderDetailPayment | null;
  paymentId: string;
  biteshipTrackinglimits: IOrderDetailBiteshipTrackingLimit[];
  invoiceHistories: IOrderDetailInvoiceHistory[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailPayment {
  id: string;
  bank: string;
  amount: number;
  status: string;
  user?: IOrderDetailUser | null;
  userId: string;
  invoices: IOrderDetailInvoice[];
  carts: IOrderDetailCart[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailCourier {
  id: string;
  availableForCashOnDelivery?: boolean | null;
  availableForProofOfDelivery?: boolean | null;
  availableForInstantWaybillId?: boolean | null;
  courierType: string;
  courierInsurance?: string | null;
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
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailInvoiceHistory {
  id: string;
  status: string;
  invoice?: IOrderDetailInvoice | null;
  invoiceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailBankAccount {
  id: string;
  bank: string;
  accountName: string;
  accountNumber: string;
  confirmationPayment?: IOrderDetailConfirmationPayment | null;
  store?: IOrderDetailStore | null;
  storeId: string;
  withdraws: IOrderDetailWithdraw[];
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailProductAttachment {
  id: string;
  url: string;
  product?: IOrderDetailProduct | null;
  productId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailConfirmationPayment {
  id: string;
  amount: number;
  attachment: string;
  cart?: IOrderDetailCart | null;
  cartId: string;
  bankAccount?: IOrderDetailBankAccount | null;
  bankAccountId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderDetailBiteshipTrackingLimit {
  id: string;
  user?: IOrderDetailUser | null;
  userId: string;
  invoice?: IOrderDetailInvoice | null;
  invoiceId: string;
  nextAccessTime: string;
  createdAt: string;
  updatedAt: string;
}
