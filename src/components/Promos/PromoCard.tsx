import type { PromoCardProps } from "../../types/promoCard.types";

export function PromoCard({
  title,
  description,
  image,
  imageAlt,
  onExplore,
}: PromoCardProps) {
  return (
    <article
      className="
        flex h-62.5 min-w-0
        overflow-hidden rounded-lg
        bg-[#241612]
      "
    >
      {/* Imagem à esquerda */}
      <div
        className="
          h-full w-[33.3%]
          shrink-0 overflow-hidden
          rounded-lg
        "
      >
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="
            h-full w-full
            object-cover object-center
          "
        />
      </div>

      {/* Conteúdo à direita */}
      <div
        className="
          flex min-w-0 flex-1
          flex-col items-end
          justify-center gap-3
          px-5 text-right
        "
      >
        <h3
          className="
            max-w-full font-mono
            text-sm leading-5
            font-bold text-[#F5F1EB]
          "
        >
          {title}
        </h3>

        <p
          className="
            max-w-full font-mono
            text-xs leading-5
            text-[#CFB28C]
          "
        >
          {description}
        </p>

        <button
          type="button"
          disabled={!onExplore}
          onClick={onExplore}
          className="
            rounded-md bg-[#D28A4C]
            px-6 py-2
            font-mono text-xs
            font-bold text-background
            transition-colors
            enabled:hover:bg-[#E89B55]
            disabled:cursor-default
          "
        >
          Explorar →
        </button>
      </div>
    </article>
  );
}
