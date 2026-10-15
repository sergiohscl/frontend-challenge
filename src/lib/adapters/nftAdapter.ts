import type { NFT } from "@/types/nft";
import type { Product } from "@/types/product.types";

export function nftToProduct(nft: NFT): Product {
  return {
    id: nft.id,
    name: nft.name,
    price: nft.price,
    imageUrl: nft.image,
    imageAlt: nft.name,
    collection: nft.collection,
    network: nft.network,
    createdAt: nft.createdAt,
    isTrending: nft.isTrending,
  };
}
