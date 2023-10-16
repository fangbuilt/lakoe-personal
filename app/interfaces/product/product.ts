export interface IProduct {
  id: string;
  name: string;
  attachments: IProductAttachment[];
  isActive: boolean;
  storeId: string;
  category: ICategory;
  categoryId: string;
  variants: IVariant[];
  store: IStore;
  slug: string;
}

export interface IVariant {
  id: string;
  name: string;
  product?: IProduct;
  variantOptions: IVariantOption[];
}

export interface IVariantOption {
  id: string;
  name: string;
  variant?: IVariant;
  variantOptionValues: IVariantOptionValue[];
}

export interface IVariantOptionValue {
  id: string;
  variantOption?: IVariantOption;
  sku: string;
  stock: number;
  price: number;
}

export interface IProductAttachment {
  id: string;
  url: string;
}

export interface IStore {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
  parentId: String;
}
