import { useState } from "react";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";
import type { NFT } from "@/types/nft";

interface NFTMobileDetailsProps {
  nft: NFT;
  onBack?: () => void;
  onBuy?: (quantity: number) => void;
  onAddToCart?: (quantity: number) => void;
  maxQuantity?: number;
  rating?: number;
  reviewCount?: number;
  editions?: string[];
  attributes?: string[];
}

export function NFTMobileDetails({
  nft,
  onBack,
  onBuy,
  onAddToCart,
  maxQuantity = 10,
  rating = 4.8,
  reviewCount = 19,
  editions = [],
  attributes = [],
}: NFTMobileDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const defaultDescription =
    "Um colecionável digital 1/50 finalizado à mão da coleção Kurio Editions, verificado na Ethereum.";

  const defaultEditions = ["1/10", "1/10", "1/50", "ABERTA"];

  const defaultAttributes = ["Óculos", "Esmeralda", "Raro"];

  const displayDescription = nft.description?.trim() || defaultDescription;

  const displayEditions = editions.length > 0 ? editions : defaultEditions;

  const displayAttributes =
    attributes.length > 0 ? attributes : defaultAttributes;
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedEdition, setSelectedEdition] = useState<string | null>(null);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  return (
    <article className="mx-auto w-full max-w-103.5 overflow-hidden rounded-[40px] bg-[#241612] font-mono text-[#F5F1EB]">
      {/* Hero */}
      <div className="relative px-6 pt-5">
        <div className="mb-2 flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Voltar"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F1D15] text-primary"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-label={
              isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"
            }
            aria-pressed={isFavorite}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2F1D15] text-primary"
          >
            <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
          </button>
        </div>

        <div className="aspect-square w-full overflow-hidden rounded-t-3xl bg-[#2F1D15]">
          <img
            src={nft.image}
            alt={nft.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Details sheet */}
      <div className="relative -mt-2 rounded-t-[40px] bg-[#241612] px-6 pt-6 pb-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-lg font-bold">{nft.name}</h1>

          <div className="flex items-center gap-1 rounded-full border border-primary px-2 py-1 text-xs">
            <Star size={12} className="fill-primary text-primary" />
            <span>{rating.toFixed(1)}</span>
            <span>({reviewCount})</span>
          </div>
        </div>

        <p className="mt-3 text-sm leading-6 font-normal text-[#CFB28C]">
          {displayDescription}
        </p>

        {/* Edições */}
        <div className="mt-3">
          <h2 className="text-[15px] leading-4 font-bold text-[#F5F1EB]">
            Edição:
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            {displayEditions.map((edition, index) => {
              const editionKey = `${edition}-${index}`;
              const isSelected =
                selectedEdition === editionKey ||
                (selectedEdition === null && index === 2);

              return (
                <button
                  key={editionKey}
                  type="button"
                  onClick={() => setSelectedEdition(editionKey)}
                  aria-pressed={isSelected}
                  className={`flex h-7 items-center justify-center rounded-full border px-2 text-sm leading-4 transition-colors ${
                    isSelected
                      ? "border-[#D28A4C] font-medium text-[#EB9855]"
                      : "border-[#3F2319] font-normal text-[#CFB28C]"
                  }`}
                >
                  {edition}
                </button>
              );
            })}
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-4 space-y-3 text-sm text-[#CFB28C]">
          <p>ID do token: #{nft.id}</p>
          <p>Coleção: {nft.collection ?? "Não informada"}</p>

          <p>Atributos: {displayAttributes.join(", ")}</p>
        </div>
      </div>

      {/* Buy bar */}
      <div className="rounded-t-[40px] bg-[#241612] px-6 pt-5 pb-9  shadow-[0_0_20px_0_#0A060473]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-[#CFB28C]">Qtd.</span>

            <button
              type="button"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
              aria-label="Diminuir quantidade"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[#140D0A] disabled:opacity-50"
            >
              <Minus size={14} />
            </button>

            <span aria-live="polite">{quantity}</span>

            <button
              type="button"
              onClick={increaseQuantity}
              disabled={quantity >= maxQuantity}
              aria-label="Aumentar quantidade"
              className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[#140D0A] disabled:opacity-50"
            >
              <Plus size={14} />
            </button>
          </div>

          <span className="text-base font-bold text-primary">
            {(nft.price * quantity).toFixed(2)} {nft.currency}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onBuy?.(quantity)}
            disabled={!onBuy}
            className="min-h-12 flex-1 rounded-full bg-primary px-4 font-bold text-[#140D0A] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Comprar NFT
          </button>

          <button
            type="button"
            onClick={() => onAddToCart?.(quantity)}
            disabled={!onAddToCart}
            aria-label="Adicionar ao carrinho"
            className="flex h-15 w-15 shrink-0 items-center justify-center rounded-full border border-[#493026] bg-[#2F1D15] text-[#CFB28C] transition hover:border-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
