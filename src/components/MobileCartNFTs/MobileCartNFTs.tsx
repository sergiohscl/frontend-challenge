import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import type { CartNFT } from "@/components/DesktopCartNFTs";

interface MobileCartNFTsProps {
  items: CartNFT[];
  onCartChange: (items: CartNFT[]) => void;
  onBack?: () => void;
}

export function MobileCartNFTs({
  items,
  onCartChange,
  onBack,
}: MobileCartNFTsProps) {
  const updateQuantity = (id: string, quantity: number) => {
    onCartChange(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    onCartChange(items.filter((item) => item.id !== id));
  };

  return (
    <section className="w-full font-mono text-[#F5F1EB]">
      {/* Cabeçalho */}
      <div className="mb-7 flex items-center gap-5">
        <button
          type="button"
          onClick={onBack}
          aria-label="Voltar"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#493026] bg-[#2F1D15] text-[#CFB28C]"
        >
          <ArrowLeft size={22} />
        </button>

        <h1 className="flex-1 text-center text-xl font-bold">
          Carrinho de NFTs
        </h1>

        <div className="w-11 shrink-0" aria-hidden="true" />
      </div>

      {/* Produtos */}
      <div className="space-y-5">
        {items.map((item) => (
          <article
            key={item.id}
            className="relative flex min-h-28 overflow-hidden rounded-2xl bg-[#291914]"
          >
            {/* Imagem */}
            <img
              src={item.image}
              alt={item.name}
              className="w-28 shrink-0 object-cover sm:w-32"
            />

            {/* Informações */}
            <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 px-3 py-3">
              <div>
                <h2 className="truncate text-sm font-bold sm:text-base">
                  {item.name}
                </h2>

                <p className="mt-1 text-xs text-[#CFB28C]">
                  Edição: {item.tokenId}
                </p>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-2">
                <span className="text-base font-bold text-primary">
                  {(item.price * item.quantity).toFixed(2)} ETH
                </span>

                {/* Quantidade */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      item.quantity === 1
                        ? removeItem(item.id)
                        : updateQuantity(
                            item.id,
                            item.quantity - 1,
                          )
                    }
                    aria-label={
                      item.quantity === 1
                        ? `Remover ${item.name}`
                        : `Diminuir quantidade de ${item.name}`
                    }
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#493026] bg-[#2F1D15] text-[#CFB28C]"
                  >
                    {item.quantity === 1 ? (
                      <Trash2 size={14} />
                    ) : (
                      <Minus size={14} />
                    )}
                  </button>

                  <span
                    className="min-w-3 text-center text-sm"
                    aria-live="polite"
                  >
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                    aria-label={`Aumentar quantidade de ${item.name}`}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#493026] bg-[#2F1D15] text-[#F5F1EB]"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}

        {items.length === 0 && (
          <div className="rounded-2xl bg-[#291914] px-5 py-12 text-center">
            <p className="text-base font-bold">
              Seu carrinho está vazio.
            </p>

            <p className="mt-2 text-sm text-[#CFB28C]">
              Explore os NFTs disponíveis e adicione seus favoritos.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
