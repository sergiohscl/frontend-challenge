import type { FeaturedNFTBannerProps } from "../../types/featuredNFT.types";

export function FeaturedNFTBanner({
  nft,
  onClick,
}: FeaturedNFTBannerProps) {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="font-mono text-lg font-bold text-[#E89B55]">
          {nft.title}
        </h3>

        {nft.description && (
          <p className="font-mono text-sm font-bold text-[#F5F1EB]">
            {nft.description}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={!onClick}
        onClick={() => onClick?.(nft)}
        className="group w-full overflow-hidden rounded-[15px] disabled:cursor-default"
        aria-label={`Ver ${nft.title}`}
      >
        <img
          src={nft.imageUrl}
          alt={nft.imageAlt ?? nft.title}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-300 group-enabled:hover:scale-105"
        />
      </button>
    </div>
  );
}
