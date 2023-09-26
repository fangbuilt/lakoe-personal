export interface Product {
  name: string;
  url: string;
  category: string;
  description: string;
  image: MediaSource | Blob | string;
  variant?: string;
  price: number;
  min_order: number;
  stock: number;
  sku?: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
}
