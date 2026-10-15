import { CollectionFilter } from "./CollectionFilter";
import { PriceFilter } from "./PriceFilter";
import { NetworkFilter } from "./NetworkFilter";
import { FeaturedNFTBanner } from "./FeaturedNFTBanner";

import type { CollectionOption } from "../../types/collection.types";
import type { NetworkOption } from "../../types/networkFilter.types";
import type { PriceRange } from "../../types/priceFilter.types";
import type { FeaturedNFT } from "../../types/featuredNFT.types";

type ProductsSidebarProps = {
  featuredNFT?: FeaturedNFT;
  selectedCollection: string | null;
  onCollectionChange: (collection: string | null) => void;
  selectedNetwork: string | null;
  onNetworkChange: (network: string | null) => void;
  onPriceApply: (range: PriceRange) => void;
};

const collections: CollectionOption[] = [
  { id: "digital-art", label: "Digital Art", count: 33 },
  { id: "collectibles", label: "Collectibles", count: 12 },
  { id: "gaming", label: "Gaming", count: 85 },
  { id: "photography", label: "Photography", count: 39 },
  { id: "music", label: "Music", count: 23 },
  { id: "virtual-worlds", label: "Virtual Worlds", count: 17 },
  { id: "sports", label: "Sports", count: 19 },
  { id: "others", label: "Others", count: 13 },
  { id: "more", label: "More", count: 18 },
];

const networks: NetworkOption[] = [
  { id: "ethereum", label: "Ethereum", count: 119 },
  { id: "polygon", label: "Polygon", count: 78 },
  { id: "solana", label: "Solana", count: 86 },
];

export function ProductsSidebar({
  featuredNFT,
  selectedCollection,
  onCollectionChange,
  selectedNetwork,
  onNetworkChange,
  onPriceApply,
}: ProductsSidebarProps) {
  return (
    <aside
      aria-label="Filtros de produtos"
      className="flex w-full flex-col gap-6 lg:w-77.5"
    >
      <div className="rounded-xl bg-surface p-5">
        <div className="flex flex-col gap-10">
          <CollectionFilter
            collections={collections}
            selectedCollection={selectedCollection}
            onCollectionChange={onCollectionChange}
          />

          <PriceFilter
            minPrice={0.02}
            maxPrice={12.3}
            onApply={onPriceApply}
          />

          <NetworkFilter
            networks={networks}
            selectedNetwork={selectedNetwork}
            onNetworkChange={onNetworkChange}
          />
        </div>
      </div>

      {featuredNFT && (
        <FeaturedNFTBanner nft={featuredNFT} />
      )}
    </aside>
  );
}
