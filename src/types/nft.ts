export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  creator: string;
  collection?: string;
  network?: string;
  createdAt?: string;
  isTrending?: boolean;
}
