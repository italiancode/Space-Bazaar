// Define the product interface
export interface ProductInterface {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  ratings: number;
  reviews: number;
  sku: string;
  dimensions: string;
  weight: string;
  featured: boolean;
  score?: number; // Optional score property for trending products
  likes: number;
  comments?: number;
  purchases: number;
  shares: number;
}
