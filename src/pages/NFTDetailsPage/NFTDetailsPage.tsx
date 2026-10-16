import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { nftService } from "@/services/nftService";

import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { Footer } from "@/components/Footer/Footer";
import { NFTGallery } from "@/components/NFTGallery/NFTGallery";
import { NFTDetails } from "@/components/NFTDetails/NFTDetails";
import { NFTDescription } from "@/components/NFTDescription/NFTDescription";
import { RelatedProducts } from "@/components/RelatedProducts/RelatedProducts";
import { NFTMobileDetails } from "@/components/NFTMobileDetails/NFTMobileDetails";

export function NFTDetailsPage() {
  const { id } = useParams({
    from: "/nft/$id",
  });

  const navigate = useNavigate();
  const { addItem } = useCart();
  const [addedQuantity, setAddedQuantity] = useState<number | null>(null);

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

  // NFTs relacionados
  const relatedNFTs = nft
    ? allNFTs.filter(
        (item) => item.id !== nft.id && item.collection === nft.collection,
      )
    : [];

  // Navegação entre NFTs
  const handleRelatedProductClick = (productId: string) => {
    void navigate({
      to: "/nft/$id",
      params: { id: productId },
    });
  };

  // Adicionar NFT ao carrinho
  const handleAddToCart = (quantity: number) => {
    if (!nft) return;

    addItem({
      id: String(nft.id),
      name: nft.name,
      tokenId: `#${String(nft.id).padStart(4, "0")}`,
      image: nft.image,
      price: nft.price,
      quantity,
    });

    setAddedQuantity(quantity);
  };

  return (
    <div className="min-h-screen bg-[#140D0A]">
      {/* Header */}
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
            {/* Versão mobile */}
            <div className="lg:hidden">
              <NFTMobileDetails
                nft={nft}
                onBack={() => {
                  void navigate({ to: "/" });
                }}
              />
            </div>

            {/* Galeria e detalhes desktop */}
            <div
              className="
                hidden grid-cols-1 items-start gap-8
                lg:grid
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
                  onAddToCart={handleAddToCart}
                  addedQuantity={addedQuantity}
                  onViewCart={() => {
                    void navigate({ to: "/cart" });
                  }}
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

            {/* Produtos relacionados */}
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
