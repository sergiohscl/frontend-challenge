import { useMemo, useState } from "react";

import { ProductsSidebar } from "./ProductsSidebar";
import { ProductsToolbar } from "./ProductsToolbar";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";

import type { Product } from "../../types/product.types";
import type { FeaturedNFT } from "../../types/featuredNFT.types";
import type { PriceRange } from "../../types/priceFilter.types";
import type {
  ProductSort,
  ProductTab,
} from "../../types/productsToolbar.types";

type ProductsProps = {
  products: Product[];
  featuredNFT?: FeaturedNFT;
  onProductClick?: (product: Product) => void;

  selectedCollection: string | null;
  onCollectionChange: (collection: string | null) => void;

  selectedNetwork: string | null;
  onNetworkChange: (network: string | null) => void;

  priceRange: PriceRange;
  onPriceApply: (range: PriceRange) => void;
};

const ITEMS_PER_PAGE = 9;

function normalizeFilterValue(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

export function Products({
  products,
  featuredNFT,
  onProductClick,
  selectedCollection,
  onCollectionChange,
  selectedNetwork,
  onNetworkChange,
  priceRange,
  onPriceApply,
}: ProductsProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [sortBy, setSortBy] = useState<ProductSort>("default");

  // Filtros e ordenação
  const visibleProducts = useMemo(() => {
    let result = [...products];

    if (selectedCollection) {
      result = result.filter(
        (product) =>
          product.collection &&
          normalizeFilterValue(product.collection) === selectedCollection,
      );
    }

    if (selectedNetwork) {
      result = result.filter(
        (product) =>
          product.network &&
          normalizeFilterValue(product.network) === selectedNetwork,
      );
    }

    result = result.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    if (activeTab === "new") {
      result = result.filter((product) => Boolean(product.createdAt));
    }

    if (activeTab === "trending") {
      result = result.filter((product) => product.isTrending === true);
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "recent") {
      result.sort((a, b) => {
        const dateA = a.createdAt ? Date.parse(a.createdAt) || 0 : 0;

        const dateB = b.createdAt ? Date.parse(b.createdAt) || 0 : 0;

        return dateB - dateA;
      });
    }

    // "default" mantém a ordem recebida da API.

    return result;
  }, [
    products,
    selectedCollection,
    selectedNetwork,
    priceRange.min,
    priceRange.max,
    activeTab,
    sortBy,
  ]);

  // Paginação utilizada apenas no desktop
  const totalPages = Math.ceil(visibleProducts.length / ITEMS_PER_PAGE);

  const filterKey = [
    selectedCollection ?? "",
    selectedNetwork ?? "",
    priceRange.min,
    priceRange.max,
  ].join("|");

  const [paginationState, setPaginationState] = useState({
    filterKey,
    page: 1,
  });

  const effectiveCurrentPage =
    paginationState.filterKey === filterKey ? paginationState.page : 1;

  const resolvedCurrentPage = Math.max(
    1,
    Math.min(effectiveCurrentPage, totalPages || 1),
  );

  const displayedProducts = useMemo(() => {
    const startIndex = (resolvedCurrentPage - 1) * ITEMS_PER_PAGE;

    return visibleProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visibleProducts, resolvedCurrentPage]);

  function handleTabChange(tab: ProductTab) {
    setActiveTab(tab);
    setPaginationState({ filterKey, page: 1 });
  }

  function handleSortChange(sort: ProductSort) {
    setSortBy(sort);
    setPaginationState({ filterKey, page: 1 });
  }

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;

    setPaginationState({ filterKey, page });
  }

  function handleCollectionChange(collection: string | null) {
    onCollectionChange(collection);
    setPaginationState({ filterKey, page: 1 });
  }

  function handleNetworkChange(network: string | null) {
    onNetworkChange(network);
    setPaginationState({ filterKey, page: 1 });
  }

  function handlePriceApply(range: PriceRange) {
    onPriceApply(range);
    setPaginationState({ filterKey, page: 1 });
  }

  return (
    <section
      aria-label="Marketplace de NFTs"
      className="mx-auto w-full max-w-300"
    >
      <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
        {/* Sidebar desktop */}
        <div className="hidden shrink-0 lg:block lg:w-77.5">
          <ProductsSidebar
            featuredNFT={featuredNFT}
            selectedCollection={selectedCollection}
            onCollectionChange={handleCollectionChange}
            selectedNetwork={selectedNetwork}
            onNetworkChange={handleNetworkChange}
            onPriceApply={handlePriceApply}
          />
        </div>

        {/* Conteúdo principal */}
        <div className="flex min-w-0 flex-1 flex-col gap-6 lg:gap-8">
          <ProductsToolbar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />

          <div
            id="nft-products-panel"
            role="tabpanel"
            aria-labelledby={`nft-tab-${activeTab}`}
            className="flex flex-col lg:min-h-300"
          >
            {/* Mobile: somente os NFTs da primeira página */}
            <div className="lg:hidden">
              <ProductGrid
                products={visibleProducts.slice(0, ITEMS_PER_PAGE)}
                onProductClick={onProductClick}
              />
            </div>

            {/* Desktop: nove NFTs por página */}
            <div className="hidden lg:block">
              <ProductGrid
                products={displayedProducts}
                onProductClick={onProductClick}
              />
            </div>

            {/* Paginação exclusiva do desktop */}
            {totalPages > 1 && (
              <div className="mt-12 hidden lg:mt-auto lg:block lg:pt-12">
                <Pagination
                  currentPage={resolvedCurrentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
