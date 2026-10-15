import { Minus, Plus, Trash2 } from "lucide-react";

export interface CartNFT {
  id: string;
  name: string;
  tokenId: string;
  image: string;
  price: number;
  quantity: number;
}

interface DesktopCartNFTsProps {
  items: CartNFT[];
  onCartChange: (items: CartNFT[]) => void;
}

export function DesktopCartNFTs({
  items,
  onCartChange,
}: DesktopCartNFTsProps) {
  const updateQuantity = (id: string, change: number) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + change),
          }
        : item,
    );

    onCartChange(updatedItems);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter((item) => item.id !== id);

    onCartChange(updatedItems);
  };

  return (
    <section className="hidden w-full min-w-0 lg:block">
      {/* Breadcrumb */}
      <nav
        aria-label="Navegação"
        className="mb-2 text-[12px] font-semibold text-text-primary"
      >
        Início / Mercado / Carrinho
      </nav>

      {/* Cabeçalho */}
      <div className="grid grid-cols-[minmax(0,1fr)_108px_106px_116px_36px] items-center gap-2 border-b border-[#493020] pb-2 text-[13px] font-semibold text-text-primary">
        <span>NFTs</span>
        <span>Preço</span>
        <span>Edições</span>
        <span>Total</span>
        <span />
      </div>

      {/* Lista de NFTs */}
      <div className="mt-2 flex flex-col gap-2.5">
        {items.map((item) => (
          <article
            key={item.id}
            className="grid min-h-13.75 grid-cols-[minmax(0,1fr)_108px_106px_116px_36px] items-center gap-2 bg-[#261712] text-text-primary"
          >
            {/* Imagem e informações */}
            <div className="flex min-w-0 items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="h-13.75 w-13.75 shrink-0 rounded-[5px] object-cover"
              />

              <div className="min-w-0">
                <h3 className="truncate text-[13px] font-bold">
                  {item.name}
                </h3>

                <p className="mt-1 truncate text-[11px] text-[#B99970]">
                  ID do token: {item.tokenId}
                </p>
              </div>
            </div>

            {/* Preço unitário */}
            <span className="text-[13px] font-semibold text-[#C7A47E]">
              {item.price.toFixed(2)} ETH
            </span>

            {/* Controle de edições */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Diminuir edições de ${item.name}`}
                disabled={item.quantity <= 1}
                onClick={() => updateQuantity(item.id, -1)}
                className="flex h-5.5 w-4 items-center justify-center rounded-full bg-[#D48B4B] text-background transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus size={12} />
              </button>

              <span className="min-w-2.5 text-center text-[13px]">
                {item.quantity}
              </span>

              <button
                type="button"
                aria-label={`Aumentar edições de ${item.name}`}
                onClick={() => updateQuantity(item.id, 1)}
                className="flex h-5.5 w-4 items-center justify-center rounded-full bg-[#D48B4B] text-background transition-opacity hover:opacity-80"
              >
                <Plus size={12} />
              </button>
            </div>

            {/* Total por NFT */}
            <span className="text-[13px] font-bold text-primary">
              {(item.price * item.quantity).toFixed(2)} ETH
            </span>

            {/* Remover NFT */}
            <button
              type="button"
              aria-label={`Remover ${item.name}`}
              onClick={() => removeItem(item.id)}
              className="flex items-center justify-center text-[#B99970] transition-colors hover:text-red-400"
            >
              <Trash2 size={17} strokeWidth={1.5} />
            </button>
          </article>
        ))}

        {/* Carrinho vazio */}
        {items.length === 0 && (
          <p className="py-8 text-center text-[#B99970]">
            Seu carrinho está vazio.
          </p>
        )}
      </div>
    </section>
  );
}
