import { useMemo } from "react";

import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "@tanstack/react-router";

import { MobileCartNFTs } from "@/components/MobileCartNFTs/MobileCartNFTs";
import { MobileCartSummary } from "@/components/MobileCartSummary/MobileCartSummary";

import { DesktopCartNFTs } from "@/components/DesktopCartNFTs";
import { DesktopHeader } from "@/components/layout/DesktopHeader/DesktopHeader";
import { RelatedProducts } from "@/components/RelatedProducts/RelatedProducts";
import { Footer } from "@/components/Footer/Footer";

import { nfts } from "@/mocks/data/nfts";

const NETWORK_FEE = 0.016;

const FEATURED_NFT_IDS = ["4", "5", "6", "7", "8"];

export function CartPage() {
  // Estado global do carrinho
  const { items, setItems, subtotal } = useCart();

  const navigate = useNavigate();

  // Desconto temporário
  const discount = 0;

  // Taxa aplicada somente quando há NFTs
  const networkFee = items.length > 0 ? NETWORK_FEE : 0;

  // Valor final do carrinho
  const total = Math.max(0, subtotal - discount + networkFee);

  // Produtos relacionados conforme o Figma
  const relatedProducts = useMemo(() => {
    const featured = nfts.filter((nft) => FEATURED_NFT_IDS.includes(nft.id));

    const remaining = nfts
      .filter((nft) => !FEATURED_NFT_IDS.includes(nft.id))
      .slice(0, 10);

    return [...featured, ...remaining];
  }, []);

  return (
    <div className="min-h-screen bg-background text-text-primary">
      {/* Header */}
      <DesktopHeader />

      {/* Carrinho mobile */}
      <div className="lg:hidden">
        <main className="mx-auto w-full max-w-103.5 rounded-t-[40px] bg-[#170E0B] pt-7">
          <div className="px-4">
            <MobileCartNFTs
              items={items}
              onCartChange={setItems}
              onBack={() => {
                void navigate({ to: "/" });
              }}
            />
          </div>

          <div className="mt-6">
            <MobileCartSummary
              subtotal={subtotal}
              discount={discount}
              networkFee={networkFee}
              total={total}
              disabled={items.length === 0}
              onCheckout={() => {
                void navigate({ to: "/checkout" });
              }}
            />
          </div>
        </main>
      </div>

      <main className="mx-auto w-full max-w-300 px-4 py-8">
        {/* Carrinho desktop */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
          {/* Lista de NFTs */}
          <DesktopCartNFTs items={items} onCartChange={setItems} />

          {/* Resumo da carteira */}
          <aside className="hidden lg:block">
            <h2 className="border-b border-[#493020] pb-2 text-sm font-bold">
              Resumo da carteira
            </h2>

            <div className="mt-6 flex flex-col gap-3 text-sm">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} ETH</span>
              </div>

              {/* Desconto */}
              <div className="flex justify-between">
                <span>Desconto do lançamento</span>
                <span>(-) {discount.toFixed(2)} ETH</span>
              </div>

              {/* Taxa de rede */}
              <div className="flex justify-between">
                <span>Taxa de rede</span>
                <span>{networkFee.toFixed(3)} ETH</span>
              </div>

              <p className="text-right text-[10px] text-primary">
                Taxa estimada
              </p>

              {/* Total */}
              <div className="mt-4 flex justify-between border-t border-[#493020] pt-4 font-bold">
                <span>Total</span>
                <span className="text-primary">{total.toFixed(3)} ETH</span>
              </div>

              {/* Finalizar compra */}
              <button
                type="button"
                disabled={items.length === 0}
                className="mt-4 w-full rounded bg-[#D48B4B] px-4 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => {
                  void navigate({ to: "/checkout" });
                }}
              >
                Conectar e finalizar
              </button>

              {/* Continuar explorando */}
              <a
                href="/"
                className="mt-1 text-center text-sm text-primary transition-opacity hover:opacity-80"
              >
                Continuar explorando
              </a>
            </div>
          </aside>
        </div>

        {/* Produtos relacionados */}
        <section className="mt-16">
          <RelatedProducts
            title="Colecionadores também viram"
            products={relatedProducts}
          />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
