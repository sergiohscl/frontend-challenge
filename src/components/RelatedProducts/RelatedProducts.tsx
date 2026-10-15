import { useState } from "react";
import type { NFT } from "@/types/nft";

type RelatedProductsProps = {
  products: NFT[];
  onProductClick?: (id: string) => void;
};

const ITEMS_PER_PAGE = 5;

export function RelatedProducts({
  products,
  onProductClick,
}: RelatedProductsProps) {
  const [activePage, setActivePage] = useState(0);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const currentPage = Math.min(activePage, Math.max(0, totalPages - 1));

  const visibleProducts = products.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE,
  );

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="w-full min-w-0">
      {/* Section heading */}
      <div className="flex flex-col gap-3">
        <h2 className="text-[17px] leading-4 font-bold text-[#EB9855]">
          Mais desta coleção
        </h2>

        <div className="h-px w-full bg-[#D28A4C]" />
      </div>

      {/* Products */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {visibleProducts.map((product, index) => (
          <button
            key={product.id}
            type="button"
            onClick={() => onProductClick?.(product.id)}
            className="flex min-w-0 flex-col gap-3 text-left"
          >
            {/* Área visual do card */}
            <div className="flex h-63.75 w-full items-center justify-center overflow-hidden bg-[#241612]">
              <img
                src={product.image}
                alt={product.name}
                loading="lazy"
                className={
                  index === 0
                    ? "h-60.75 w-47.5 max-w-full rounded-[11px] object-cover transition-transform duration-300 hover:scale-105"
                    : "aspect-square w-53 max-w-full rounded-[13px] object-cover transition-transform duration-300 hover:scale-105"
                }
              />
            </div>

            {/* Product details */}
            <div className="flex min-w-0 flex-col">
              <h3 className="truncate text-sm font-bold text-[#F5F1EB]">
                {product.name}
              </h3>

              <p className="text-base font-bold text-[#EB9855]">
                {product.price.toFixed(2)} {product.currency}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Carousel dots */}
      {totalPages > 1 && (
        <div
          className="mt-8 flex items-center justify-center gap-2"
          aria-label="Navegação do carrossel"
        >
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActivePage(index)}
              aria-label={`Página ${index + 1}`}
              aria-current={currentPage === index ? "page" : undefined}
              className={`h-3 w-3 rounded-full border border-[#EB9855] transition-colors ${
                currentPage === index ? "bg-[#EB9855]" : "bg-transparent"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
