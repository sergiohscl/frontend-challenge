import { useQuery } from "@tanstack/react-query";

import { HeroBanner } from "@/components/HeroBanner/HeroBanner";
import { Products } from "@/components/Products/Products";
import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { MobileSearchBar } from "@/components/layout/MobileSearchBar/MobileSearchBar";
import { useState } from "react";
import { MobileFilters } from "@/components/Products/MobileFilters";
import { MobileTabBar } from "@/components/layout/MobileTabBar/MobileTabBar";
import { Promos } from "@/components/Promos/Promos";
import { Blog } from "@/components/Blog/Blog";
import { Footer } from "@/components/Footer/Footer";
import type { PriceRange } from "@/types/priceFilter.types";

import { nftService } from "@/services/nftService";
import { nftToProduct } from "@/lib/adapters/nftAdapter";

import type { FeaturedNFT } from "@/types/featuredNFT.types";

const featuredNFT: FeaturedNFT = {
  id: "featured-sage-nomad",
  title: "NFT EM DESTAQUE",
  description: "OFERTA LIMITADA",
  imageUrl: "/images/nfts/sage-nomad.png",
  imageAlt: "Sage Nomad, NFT em destaque",
};

export function HomePage() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );

  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: 0.02,
    max: 12.3,
  });

  const {
    data: nfts = [],
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["nfts"],
    queryFn: nftService.getAll,
  });

  const products = nfts.map(nftToProduct);

  return (
    <div className="min-h-screen bg-background">
      <DesktopHeader />

      <MobileSearchBar
        filtersButton={
          <MobileFilters
            variant="icon"
            selectedCollection={selectedCollection}
            onCollectionChange={setSelectedCollection}
            selectedNetwork={selectedNetwork}
            onNetworkChange={setSelectedNetwork}
            onPriceApply={setPriceRange}
          />
        }
      />

      <main className="mx-auto w-full max-w-300 px-6 py-8 lg:px-0 lg:pb-8">
        <HeroBanner
          eyebrow="Bem-vindo à Kurio"
          title="SEJA DONO DO FUTURO DA ARTE DIGITAL"
          description="Descubra NFTs selecionados de criadores emergentes e consagrados. Colecione arte digital rara, apoie artistas e tenha uma parte da cultura da internet."
          imageDesktop="/images/nfts/emerald-ape.png"
          imageMobile="/images/nfts/emerald-ape.png"
          secondaryImageMobile="/images/nfts/sage-nomad.png"
          buttonText="EXPLORAR"
          onButtonClick={() => {
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        <div id="products" className="mt-12 scroll-mt-8">
          {isPending ? (
            <div
              role="status"
              className="py-12 text-center font-mono text-text-secondary"
            >
              Carregando NFTs...
            </div>
          ) : isError ? (
            <div
              role="alert"
              className="flex flex-col items-center gap-4 py-12"
            >
              <p className="font-mono text-text-secondary">
                Não foi possível carregar os NFTs.
              </p>

              <button
                type="button"
                onClick={() => void refetch()}
                className="rounded-md bg-primary px-6 py-2 font-mono font-bold text-background"
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <Products
              products={products}
              featuredNFT={featuredNFT}
              selectedCollection={selectedCollection}
              onCollectionChange={setSelectedCollection}
              selectedNetwork={selectedNetwork}
              onNetworkChange={setSelectedNetwork}
              priceRange={priceRange}
              onPriceApply={setPriceRange}
            />
          )}

          <div className="mt-12 lg:mt-20">
            <Promos />
          </div>

          <div className="mt-20 hidden lg:block">
            <Blog />
          </div>

          <div className="mt-20 hidden lg:block">
            <Footer />
          </div>
        </div>
      </main>

      <MobileTabBar />
    </div>
  );
}
