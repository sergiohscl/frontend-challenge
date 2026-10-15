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
        flex h-75 w-full items-center justify-center
        overflow-hidden bg-[#241612] p-1
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
    <article className="group flex w-full min-w-0 flex-col gap-3">
      {onClick ? (
        <button
          type="button"
          onClick={() => onClick(product)}
          aria-label={`Ver detalhes de ${product.name}`}
          className="
            block w-full cursor-pointer
            overflow-hidden text-left
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

      <h3
        className="
          truncate font-mono text-base
          leading-4 font-normal text-[#F5F1EB]
        "
        title={product.name}
      >
        {product.name}
      </h3>

      <p
        className="
          font-mono text-lg leading-4
          font-bold text-[#E89B55]
        "
      >
        {priceFormatter.format(product.price)} ETH
      </p>
    </article>
  );
}
