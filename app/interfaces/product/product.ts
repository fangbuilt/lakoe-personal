export interface IProduct {
  id: string;
  name: string;
  attachments: IProductAttachment[];
  isActive: boolean;
  storeId: string;
  categoryId: string;
  variants: IVariant[];
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
