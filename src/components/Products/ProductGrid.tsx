import { ProductCard } from "./ProductCard";

import type { Product } from "../../types/product.types";

type ProductGridProps = {
  products: Product[];
  onProductClick?: (product: Product) => void;
};

export function ProductGrid({
  products,
  onProductClick,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        role="status"
        className="
          flex min-h-60 items-center justify-center
          text-center
        "
      >
        <p className="font-mono text-sm text-text-secondary">
          Nenhum NFT encontrado.
        </p>
      </div>
    );
  }

  const leftColumn = products.filter(
    (_, index) => index % 2 === 0,
  );

  const rightColumn = products.filter(
    (_, index) => index % 2 !== 0,
  );

  return (
    <>
      {/* Mobile: duas colunas independentes */}
      <div
        className="
          grid w-full grid-cols-2
          items-start gap-x-4
          lg:hidden
        "
      >
        <div className="flex min-w-0 flex-col gap-6">
          {leftColumn.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>

        <div className="flex min-w-0 flex-col gap-6 pt-4">
          {rightColumn.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>

      {/* Desktop: grade tradicional */}
      <div
        className="
          hidden w-full min-w-0
          lg:grid lg:grid-cols-3
          lg:gap-x-8.5 lg:gap-y-18
        "
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>
    </>
  );
}
