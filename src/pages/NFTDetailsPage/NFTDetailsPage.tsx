import { useParams } from "@tanstack/react-router";

import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";
import { NFTGallery } from "@/components/NFTGallery/NFTGallery";
import { NFTDetails } from "@/components/NFTDetails/NFTDetails";

const nftImages = [
  "/images/nfts/emerald-ape.png",
  "/images/nfts/emerald-ape.png",
  "/images/nfts/emerald-ape.png",
  "/images/nfts/emerald-ape.png",
];

export function NFTDetailsPage() {
  const { id } = useParams({
    from: "/nft/$id",
  });

  return (
    <div className="min-h-screen bg-[#140D0A]">
      <DesktopHeader />

      <main
        className="
          mx-auto w-full max-w-350
          px-4 py-6
          lg:px-6
        "
      >
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação estrutural"
          className="
            mb-6 font-mono text-sm
            text-[#F5F1EB]
          "
        >
          Início / Mercado
        </nav>

        {/* Galeria + Detalhes */}
        <div
          className="
            grid grid-cols-1 items-start
            gap-8
            xl:grid-cols-[572px_minmax(0,1fr)]
          "
        >
          {/* Galeria */}
          <NFTGallery
            images={nftImages}
            title="Emerald Ape #042"
          />

          {/* Informações do NFT */}
          <div className="min-w-0">
            <NFTDetails
              title="Emerald Ape #042"
              price={1.19}
              description="Um colecionável digital finalizado à mão da coleção Kurio Editions, verificado na Ethereum, com arte desbloqueável e acesso para colecionadores."
              tokenId="0042"
              collection="Kurio Apes"
              attributes={[
                "Óculos",
                "Esmeralda",
                "Raro",
              ]}
              editions={[
                "1/1",
                "1/10",
                "1/50",
                "ABERTA",
              ]}
              rating={4}
              reviewCount={19}
              maxQuantity={10}
            />
          </div>
        </div>

        <p className="sr-only">
          Identificador da rota: {id}
        </p>
      </main>

      <Footer />
    </div>
  );
}