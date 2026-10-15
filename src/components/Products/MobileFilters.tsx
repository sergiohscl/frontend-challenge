
import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { ProductsSidebar } from "./ProductsSidebar";

import type { FeaturedNFT } from "../../types/featuredNFT.types";
import type { PriceRange } from "../../types/priceFilter.types";

type MobileFiltersProps = {
  featuredNFT?: FeaturedNFT;
  selectedCollection: string | null;
  onCollectionChange: (collection: string | null) => void;
  selectedNetwork: string | null;
  onNetworkChange: (network: string | null) => void;
  onPriceApply: (range: PriceRange) => void;
};

export function MobileFilters({
  selectedCollection,
  onCollectionChange,
  selectedNetwork,
  onNetworkChange,
  onPriceApply,
}: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      triggerRef.current?.focus();
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className="
          flex h-10 items-center gap-2
          rounded-md border border-[#3F2319]
          px-4 font-mono text-sm
          text-[#F5F1EB]
          transition-colors hover:border-primary
        "
      >
        <SlidersHorizontal size={18} />
        Filtros
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            aria-hidden="true"
            onClick={() => setIsOpen(false)}
          />

          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filters-title"
            className="
              absolute top-0 right-0 bottom-0
              flex w-full max-w-90 flex-col
              bg-background shadow-xl
            "
          >
            <div
              className="
                flex items-center justify-between
                border-b border-[#3F2319] p-5
              "
            >
              <h2
                id="mobile-filters-title"
                className="font-mono text-lg font-bold text-[#F5F1EB]"
              >
                Filtrar NFTs
              </h2>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar filtros"
                className="rounded-md p-2 text-[#F5F1EB]"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <ProductsSidebar
                selectedCollection={selectedCollection}
                onCollectionChange={onCollectionChange}
                selectedNetwork={selectedNetwork}
                onNetworkChange={onNetworkChange}
                onPriceApply={onPriceApply}
              />
            </div>

            <div className="border-t border-[#3F2319] p-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  h-11 w-full rounded-md bg-primary
                  font-mono font-bold text-[#140D0A]
                "
              >
                Ver resultados
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
