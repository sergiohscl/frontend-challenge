import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { nftService } from "@/services/nftService";

import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";
import { NFTGallery } from "@/components/NFTGallery/NFTGallery";
import { NFTDetails } from "@/components/NFTDetails/NFTDetails";

export function NFTDetailsPage() {
  const { id } = useParams({
    from: "/nft/$id",
  });

  const {
    data: nft,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["nft", id],
    queryFn: () => nftService.getById(id),
    enabled: Boolean(id),
  });

  return (
    <div className="min-h-screen bg-[#140D0A]">
      <DesktopHeader />

      <main className="mx-auto w-full max-w-350 px-4 py-6 lg:px-6">
        {/* Breadcrumb */}
        <nav
          aria-label="Navegação estrutural"
          className="mb-6 font-mono text-sm text-[#F5F1EB]"
        >
          Início / Mercado
        </nav>

        {/* Loading */}
        {isPending && (
          <div
            role="status"
            className="py-20 text-center font-mono text-[#CFB28C]"
          >
            Carregando informações do NFT...
          </div>
        )}

        {/* Erro */}
        {isError && (
          <div
            role="alert"
            className="py-20 text-center font-mono text-red-400"
          >
            Não foi possível carregar o NFT.
          </div>
        )}

        {/* Conteúdo */}
        {nft && (
          <div
            className="
              grid grid-cols-1 items-start gap-8
              xl:grid-cols-[572px_minmax(0,1fr)]
            "
          >
            {/* Galeria */}
            <NFTGallery
              images={[nft.image]}
              title={nft.name}
            />

            {/* Detalhes */}
            <div className="min-w-0">
              <NFTDetails
                title={nft.name}
                price={nft.price}
                description="Colecionável digital da coleção selecionada."
                tokenId={String(nft.id)}
                collection={nft.collection ?? "Coleção não informada"}
                attributes={[]}
                editions={[]}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}