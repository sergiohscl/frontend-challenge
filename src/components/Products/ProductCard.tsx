import type { ProductCardProps } from "../../types/product.types";

const priceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function ProductCard({
  product,
  onClick,
}: ProductCardProps) {
  const image = (
    <div
      className="
        flex aspect-square w-full items-center justify-center
        overflow-hidden rounded-[15px] bg-[#241612] p-1
        lg:aspect-auto lg:h-75
      "
    >
      <img
        src={product.imageUrl}
        alt={product.imageAlt ?? product.name}
        loading="lazy"
        className="
          h-full w-full rounded-[15px]
          object-cover object-center
          transition-transform duration-300
          group-hover:scale-105
        "
      />
    </div>
  );

  return (
    <article className="group flex w-full min-w-0 flex-col gap-2 lg:gap-3">
      {onClick ? (
        <button
          type="button"
          onClick={() => onClick(product)}
          aria-label={`Ver detalhes de ${product.name}`}
          className="
            block w-full cursor-pointer overflow-hidden
            rounded-[15px] text-left
            focus-visible:outline-2
            focus-visible:outline-offset-2
            focus-visible:outline-primary
          "
        >
          {image}
        </button>
      ) : (
        image
      )}

      <div className="flex min-w-0 flex-col gap-1">
        <h3
          title={product.name}
          className="
            truncate font-mono text-xs leading-4
            font-normal text-[#F5F1EB]
            lg:text-base
          "
        >
          {product.name}
        </h3>

        <p
          className="
            font-mono text-sm leading-4 font-bold
            text-[#E89B55] lg:text-lg
          "
        >
          {priceFormatter.format(product.price)} ETH
        </p>
      </div>
    </article>
  );
}
