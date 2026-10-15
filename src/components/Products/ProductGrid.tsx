
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
        className="flex min-h-60 items-center justify-center text-center"
      >
        <p className="font-mono text-sm text-text-secondary">
          Nenhum NFT encontrado.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid w-full min-w-0
        grid-cols-2
        gap-x-4 gap-y-8
        lg:grid-cols-3
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
  );
}
