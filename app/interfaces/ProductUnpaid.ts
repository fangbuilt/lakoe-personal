export interface Cart {
  id: string;
  price: number;
  discount: number;
  user?: User;
  store?: Store;
  userId?: string;
  storeId?: string;
  payment?: Payment;
  paymentId?: string;
  cartItems: CartItem[];
  invoice: Invoice[];
  createdAt: Date;
  updatedAt: Date;
  // confirmationPayment?: ConfirmationPayment;
}

export interface Store {
  id: string;
  name: string;
  credit: number;
  slogan?: string;
  description: string;
  domain: string;
  logoAttachment?: string;
  bannerAttachment?: string;
  users: User[];
  storesDecorations: StoreDecoration[];
  operationHours: OperationHour[];
  messageTemplates: MessageTemplate[];
  locations: Location[];
  products: Product[];
  carts: Cart[];
  cartItems: CartItem[];
  bankAccount: BankAccount[];
  withdraw: Withdraw[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: string;
  qty: number;
  price: number;
  product?: Product;
  cart?: Cart;
  user?: User;
  store?: Store;
  productId?: string;
  cartId?: string;
  userId?: string;
  storeId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Invoice {
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
  notes: string;
  receiverEmail: string;
  receiverPostalCode: string;
  receiverAddressNote: string;
  invoiceNumber: string;
  waybill: string;
  cart?: Cart;
  payment?: Payment;
  courier?: Courier;
  user?: User;
  cartId?: string;
  courierId?: string;
  userId?: string;
  invoiceHistories: InvoiceHistory[];
  mootaTransactionId: string;
  createdAt: Date;
  updatedAt: Date;
  paymentId?: string;
}

export interface Payment {
  id: string;
  bank: string;
  amount: number;
  status: string;
  invoice: Invoice[];
  user?: User;
  userId?: string;
  cart: Cart[];
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  profile?: Profile;
  store?: Store;
  carts: Cart[];
  cartItems: CartItem[];
  invoices: Invoice[];
  payments: Payment[];
  role: Role;
  roleId: string;
  storeId?: string;
  withdraw: Withdraw[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  attachment?: ProductAttachment;
  attachmentId?: string;
  isActive: boolean;
  minimumOrder: number;
  store?: Store;
  storeId: string;
  category: Category;
  categoryId: string;
  slug: string;
  variants: Variant[];
  cartItems: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductAttachment {
  id: string;
  attachment: string;
  product: Product[];
  createdAt: Date;
  updatedAt: Date;
}

interface Courier {
  id: string;
  availableForCashOnDelivery?: boolean;
  availableForProofOfDelivery?: boolean;
  availableForInstantWaybillId?: boolean;
  courierType: string;
  courierInsurance?: string;
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
  invoices: Invoice[];
  createdAt: Date;
  updatedAt: Date;
}
export interface Withdraw {
  id: string;
  store: Store[];
  storeId: string;
  bankAccount: BankAccount[];
  bankId: string;
  amount: number;
  status: string;
  approvedBy: User[];
  approvedById: string;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: string;
  name: string;
  users: User[];
  createdAt: string;
  updatedAt: string;
}
export interface Profile {
  id: string;
  user: User;
  userId: string;
  locations: Location[];
  createdAt: string;
  updatedAt: string;
}

export interface Decoration {
  id: string;
  type: string;
  storesDecorations: StoreDecoration[];
  createdAt: string;
  updatedAt: string;
}

export interface StoreDecoration {
  id: string;
  decoration: Decoration[];
  store: Store[];
  decorationId: string[];
  storeId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface OperationHour {
  id: string;
  day: string;
  openAt: string;
  closeAt: string;
  isOff: boolean[];
  store: Store[];
  storeId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
  store: Store[];
  storeId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  postalCode: string;
  cityDistrict: string;
  latitude: string;
  longtitude: string;
  store: Store[];
  profile: Profile[];
  isMainLocation: boolean;
  storeId: string[];
  profileId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Variant {
  id: string;
  name: string;
  isActive: boolean;
  product: Product[];
  productId: string[];
  variantOptions: VariantOption[];
  createdAt: string;
  updatedAt: string;
}

export interface VariantOption {
  id: string;
  name: string;
  variant: Variant[];
  variantId: string[];
  variantOptionValues: VariantOptionValue[];
  createdAt: string;
  updatedAt: string;
}

export interface VariantOptionValue {
  id: string;
  variantOption: VariantOption[];
  sku: string;
  weight: number;
  size: VariantOptionValueSize[];
  stock: number;
  price: number;
  isActive: boolean;
  variantOptionId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface VariantOptionValueSize {
  id: string;
  length: number;
  width: number;
  height: number;
  variantOptionValue: VariantOptionValue[];
  variantOptionValueId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  Product: Product[];
}

export interface InvoiceHistory {
  id: string;
  status: string;
  invoice: Invoice[];
  invoiceId: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BankAccount {
  id: string;
  bank: string;
  accountName: string;
  accountNumber: string;
  store: Store[];
  storeId: string[];
  withdraw: Withdraw[];
  createdAt: string;
  updatedAt: string;
}
