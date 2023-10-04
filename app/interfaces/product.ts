export interface Product {
  name: string;
  url: string;
  category: string;
  description: string;
  attachments: MediaSource[] | Blob[] | string[];
  variant?: string;
  price: number;
  minimumOrder: number;
  stock: number;
  sku?: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
}
