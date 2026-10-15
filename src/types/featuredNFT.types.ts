export type FeaturedNFT = {
  id: string;
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt?: string;
};

export type FeaturedNFTBannerProps = {
  nft: FeaturedNFT;
  onClick?: (nft: FeaturedNFT) => void;
};
