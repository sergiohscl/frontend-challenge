import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { nftService } from "@/services/nftService";

import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";
import { NFTGallery } from "@/components/NFTGallery/NFTGallery";
import { NFTDetails } from "@/components/NFTDetails/NFTDetails";
import { NFTDescription } from "@/components/NFTDescription/NFTDescription";
import { RelatedProducts } from "@/components/RelatedProducts/RelatedProducts";

export function NFTDetailsPage() {
  const { id } = useParams({
    from: "/nft/$id",
  });

  const navigate = useNavigate();

  // NFT selecionado
  const {
    data: nft,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["nft", id],
    queryFn: () => nftService.getById(id),
    enabled: Boolean(id),
  });

  // Lista de NFTs
  const { data: allNFTs = [] } = useQuery({
    queryKey: ["nfts"],
    queryFn: nftService.getAll,
  });

  // NFTs da mesma coleção, excluindo o atual
  const relatedNFTs = nft ? allNFTs.filter((item) => item.id !== nft.id) : [];

  const handleRelatedProductClick = (productId: string) => {
    void navigate({
      to: "/nft/$id",
      params: { id: productId },
    });
  };

  return (
    <div className="min-h-screen bg-[#140D0A]">
      <DesktopHeader />

      <main className="mx-auto w-full max-w-300 px-4 py-6 lg:px-0">
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
          <div className="w-full min-w-0">
            {/* Galeria e detalhes */}
            <div
              className="
                grid grid-cols-1 items-start gap-8
                xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]
              "
            >
              {/* Galeria */}
              <div className="min-w-0">
                <NFTGallery images={[nft.image]} title={nft.name} />
              </div>

              {/* Detalhes */}
              <div className="min-w-0">
                <NFTDetails
                  title={nft.name}
                  price={nft.price}
                  description={nft.description}
                  tokenId={String(nft.id)}
                  collection={nft.collection ?? "Coleção não informada"}
                  attributes={[]}
                  editions={[]}
                />
              </div>
            </div>

            {/* Descrição completa */}
            <section className="mt-10 w-full min-w-0">
              <NFTDescription
                description={nft.description}
                network={nft.network}
                contract="0x7A42...19E8 • Contrato inteligente ERC-721 verificado."
                royalties="Direitos autorais do criador: 5% nas vendas secundárias, pagos automaticamente pelos mercados compatíveis."
              />
            </section>

            {/* Mais desta coleção */}
            {relatedNFTs.length > 0 && (
              <section className="mt-12 w-full min-w-0">
                <RelatedProducts
                  products={relatedNFTs}
                  onProductClick={handleRelatedProductClick}
                />
              </section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
