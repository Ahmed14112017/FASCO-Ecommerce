export interface CartItem {
  _id?: string;
  name?: string;
  description?: string;
  price?: number;
  images?: string[];
  category?: {
    _id: string;
    name: string;
    slug: string;
  };
  stock?: number;
  rating?: number;
  quantity?: number;
}
