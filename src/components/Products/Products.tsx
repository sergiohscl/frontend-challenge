import { useMemo, useState } from "react";

import { ProductsSidebar } from "./ProductsSidebar";
import { ProductsToolbar } from "./ProductsToolbar";
import { ProductGrid } from "./ProductGrid";
import { Pagination } from "./Pagination";
import { MobileFilters } from "./MobileFilters";

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
};

const ITEMS_PER_PAGE = 9;

const INITIAL_PRICE_RANGE: PriceRange = {
  min: 0.02,
  max: 12.3,
};

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
}: ProductsProps) {
  const [activeTab, setActiveTab] = useState<ProductTab>("all");
  const [sortBy, setSortBy] = useState<ProductSort>("recent");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null,
  );

  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<PriceRange>(INITIAL_PRICE_RANGE);

  // Filtros e ordenação
  const visibleProducts = useMemo(() => {
    let result = [...products];

    // Coleção
    if (selectedCollection) {
      result = result.filter(
        (product) =>
          product.collection &&
          normalizeFilterValue(product.collection) === selectedCollection,
      );
    }

    // Rede
    if (selectedNetwork) {
      result = result.filter(
        (product) =>
          product.network &&
          normalizeFilterValue(product.network) === selectedNetwork,
      );
    }

    // Faixa de preço
    result = result.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Abas
    if (activeTab === "new") {
      result = result.filter((product) => Boolean(product.createdAt));
    }

    if (activeTab === "trending") {
      result = result.filter((product) => product.isTrending === true);
    }

    // Ordenação
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "recent") {
      result.sort((a, b) => {
        const dateA = a.createdAt ? Date.parse(a.createdAt) || 0 : 0;

        const dateB = b.createdAt ? Date.parse(b.createdAt) || 0 : 0;

        return dateB - dateA;
      });
    }

    return result;
  }, [
    products,
    selectedCollection,
    selectedNetwork,
    priceRange,
    activeTab,
    sortBy,
  ]);

  // Paginação
  const totalPages = Math.ceil(visibleProducts.length / ITEMS_PER_PAGE);

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages || 1));

  const paginatedProducts = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;

    return visibleProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [visibleProducts, safeCurrentPage]);

  function handleCollectionChange(collection: string | null) {
    setSelectedCollection(collection);
    setCurrentPage(1);
  }

  function handleNetworkChange(network: string | null) {
    setSelectedNetwork(network);
    setCurrentPage(1);
  }

  function handlePriceApply(range: PriceRange) {
    setPriceRange({ ...range });
    setCurrentPage(1);
  }

  function handleTabChange(tab: ProductTab) {
    setActiveTab(tab);
    setCurrentPage(1);
  }

  function handleSortChange(sort: ProductSort) {
    setSortBy(sort);
    setCurrentPage(1);
  }

  function handlePageChange(page: number) {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
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
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          {/* Filtros mobile */}
          <MobileFilters
            selectedCollection={selectedCollection}
            onCollectionChange={handleCollectionChange}
            selectedNetwork={selectedNetwork}
            onNetworkChange={handleNetworkChange}
            onPriceApply={handlePriceApply}
          />

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
            <ProductGrid
              products={paginatedProducts}
              onProductClick={onProductClick}
            />

            {totalPages > 1 && (
              <div className="mt-12 lg:mt-auto lg:pt-12">
                <Pagination
                  currentPage={safeCurrentPage}
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
