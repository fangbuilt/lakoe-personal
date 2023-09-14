export interface IProduct {
  id: string;
  name: string;
  // description: string[];
  attachments: IProductAttachment;
  isActive: boolean;
  // minimumOrder: number;
  // store?: Store;
  storeId: string;
  // category: Category;
  categoryId: string;
  // slug: string;
  variants: IVariant[];
  // cartItems: CartItem[];
  //   createdAt: Date;
  //   updatedAt: Date;
}

export interface IVariant {
  id: string;
  name: string;
  // isActive: boolean;
  product?: IProduct;
  // productId?: string;
  variantOptions: IVariantOption[];
  // createdAt: Date;
  // updatedAt: Date;
}

export interface IVariantOption {
  id: string;
  name: string;
  variant?: IVariant;
  // variantId?: string;
  variantOptionValues: IVariantOptionValue[];
  // createdAt: Date;
  // updatedAt: Date;
}

export interface IVariantOptionValue {
  id: string;
  variantOption?: IVariantOption;
  sku: string;
  // weight: number;
  // size: VariantOptionValueSize;
  stock: number;
  price: number;
  // isActive: boolean;
  // variantOptionId?: string;
  // createdAt: Date;
  // updatedAt: Date;
}

export interface IProductAttachment {
  id: string;
  attachment: string;
  product: IProduct;
}
