import { useState } from "react";
import {
  Heart,
  Mail,
  Share2,
  Star,
  Minus,
  Plus,
  CheckCircle2,
  ShoppingCart,
} from "lucide-react";

interface NFTDetailsProps {
  title: string;
  price: number;
  description: string;
  tokenId: string;
  collection: string;
  attributes: string[];
  editions: string[];
  rating?: number;
  reviewCount?: number;
  maxQuantity?: number;
  addedQuantity?: number | null;
  onAddToCart?: (quantity: number) => void;
  onViewCart?: () => void;
}

export function NFTDetails({
  title,
  price,
  description,
  tokenId,
  collection,
  attributes,
  editions,
  rating = 4,
  reviewCount = 19,
  maxQuantity = 10,
  addedQuantity = null,
  onAddToCart,
  onViewCart,
}: NFTDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const decreaseQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => Math.min(maxQuantity, prev + 1));
  };

  return (
    <section
      aria-labelledby="nft-title"
      className="w-full min-w-0 max-w-full font-mono text-[#F5F1EB]"
    >
      {/* Título */}
      <h1
        id="nft-title"
        className="text-3xl font-bold leading-tight"
      >
        {title}
      </h1>

      {/* Preço e avaliações */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-b border-primary pb-2">
        <span className="shrink-0 text-2xl font-bold text-primary">
          {price.toFixed(2)} ETH
        </span>

        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div
            className="flex shrink-0 gap-0.5"
            aria-label={`Avaliação: ${rating} de 5 estrelas`}
          >
            {Array.from({ length: 5 }, (_, index) => (
              <Star
                key={index}
                size={15}
                className={
                  index < rating
                    ? "fill-primary text-primary"
                    : "fill-[#CFB28C] text-[#CFB28C]"
                }
              />
            ))}
          </div>

          <span className="text-xs leading-5">
            {reviewCount} avaliações de colecionadores
          </span>
        </div>
      </div>

      {/* Descrição */}
      <div className="mt-3">
        <h2 className="font-bold">Sobre este NFT:</h2>

        <p className="mt-2 text-sm leading-6 text-[#CFB28C]">
          {description}
        </p>
      </div>

      {/* Edições */}
      <div className="mt-2">
        <h3 className="font-bold">Edição:</h3>

        <div className="mt-2 flex flex-wrap gap-2">
          {editions.map((edition) => (
            <span
              key={edition}
              className="rounded-full border border-[#D9904D] px-2 py-1 text-xs text-[#CFB28C]"
            >
              {edition}
            </span>
          ))}
        </div>
      </div>

      {/* Quantidade e ações */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        {/* Controle de quantidade */}
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={decreaseQuantity}
            disabled={quantity <= 1}
            aria-label="Diminuir quantidade"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-primary text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus size={22} />
          </button>

          <span
            className="min-w-5 text-center text-lg font-bold text-text-primary"
            aria-live="polite"
          >
            {quantity}
          </span>

          <button
            type="button"
            onClick={increaseQuantity}
            disabled={quantity >= maxQuantity}
            aria-label="Aumentar quantidade"
            className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-primary text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={22} />
          </button>
        </div>

        {/* Botões de ação */}
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onAddToCart?.(quantity)}
            disabled={!onAddToCart}
            className="min-w-32 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            COMPRAR
          </button>

          <button
            type="button"
            onClick={() => setIsFavorite((prev) => !prev)}
            aria-pressed={isFavorite}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary px-3 py-3 text-sm font-bold text-primary transition hover:bg-primary/10"
          >
            <Heart
              size={20}
              fill={isFavorite ? "currentColor" : "none"}
            />
            Favoritar
          </button>
        </div>
      </div>

      {/* Confirmação de adição ao carrinho */}
      {addedQuantity !== null && (
        <div
          role="status"
          aria-live="polite"
          className="mt-4 rounded-lg border border-primary/40 bg-[#261712] p-4"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2
              size={24}
              className="shrink-0 text-primary"
            />

            <div className="min-w-0">
              <p className="text-sm font-bold text-text-primary">
                NFT adicionado ao carrinho!
              </p>

              <p className="mt-1 text-xs leading-5 text-[#CFB28C]">
                {addedQuantity}{" "}
                {addedQuantity === 1
                  ? "edição adicionada"
                  : "edições adicionadas"}{" "}
                com sucesso.
              </p>
            </div>
          </div>

          {onViewCart && (
            <button
              type="button"
              onClick={onViewCart}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-background transition-opacity hover:opacity-90"
            >
              <ShoppingCart size={17} />
              Ver carrinho
            </button>
          )}
        </div>
      )}

      {/* Informações adicionais */}
      <div className="mt-4 space-y-3 text-sm text-[#CFB28C]">
        <p>
          ID do token: <strong>#{tokenId}</strong>
        </p>

        <p>
          Coleção: <strong>{collection}</strong>
        </p>

        <p>
          Atributos:{" "}
          {attributes.length > 0
            ? attributes.join(", ")
            : "Não informados"}
        </p>
      </div>

      {/* Compartilhamento */}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className="font-bold">
          Compartilhar este NFT:
        </span>

        {/* LinkedIn */}
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartilhar no LinkedIn"
          className="transition-colors hover:text-[#D9904D]"
        >
          <Share2 size={17} />
        </a>

        {/* E-mail */}
        <a
          href={`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(window.location.href)}`}
          aria-label="Compartilhar por e-mail"
          className="transition-colors hover:text-[#D9904D]"
        >
          <Mail size={17} />
        </a>

        {/* Twitter / X */}
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Compartilhar no X"
          className="transition-colors hover:text-[#D9904D]"
        >
          <Share2 size={17} />
        </a>
      </div>
    </section>
  );
}
