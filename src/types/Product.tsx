export interface Product {
  id?: number | string;
  title: string;
  tag: string[];
  description: string;
  price: number;
  quantityDisponible: string;
  imageUrl: string;
}
