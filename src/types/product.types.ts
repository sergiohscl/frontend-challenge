export type Product = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageAlt?: string;
  collection?: string;
  network?: string;
  createdAt?: string;
  isTrending?: boolean;
};

export type ProductCardProps = {
  product: Product;
  onClick?: (product: Product) => void;
};
