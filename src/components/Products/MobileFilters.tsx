import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";

import { ProductsSidebar } from "./ProductsSidebar";

import type { PriceRange } from "../../types/priceFilter.types";

type MobileFiltersProps = {
  selectedCollection: string | null;
  onCollectionChange: (collection: string | null) => void;
  selectedNetwork: string | null;
  onNetworkChange: (network: string | null) => void;
  onPriceApply: (range: PriceRange) => void;
  variant?: "default" | "icon";
};

export function MobileFilters({
  selectedCollection,
  onCollectionChange,
  selectedNetwork,
  onNetworkChange,
  onPriceApply,
  variant = "default",
}: MobileFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }

      if (event.key === "Tab") {
        const focusableElements =
          dialogRef.current?.querySelectorAll<HTMLElement>(
            'button:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          );

        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0];
        const lastElement =
          focusableElements[focusableElements.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === firstElement
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement.focus();
        }
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
      {/* Botão para abrir os filtros */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir filtros de NFTs"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        className={
          variant === "icon"
            ? "flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary text-[#140D0A] transition-colors hover:bg-primary-hover"
            : "flex h-10 items-center gap-2 rounded-md border border-[#3F2319] px-4 font-mono text-sm text-[#F5F1EB] transition-colors hover:border-primary"
        }
      >
        <SlidersHorizontal size={18} />

        {variant === "default" && (
          <span>Filtros</span>
        )}
      </button>

      {/* Painel mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <button
            type="button"
            tabIndex={-1}
            aria-label="Fechar painel de filtros"
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/70"
          />

          {/* Drawer */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-filters-title"
            className="
              absolute top-0 right-0 bottom-0
              flex w-full max-w-90 flex-col
              bg-background shadow-xl
            "
          >
            {/* Cabeçalho */}
            <div className="flex items-center justify-between border-b border-[#3F2319] p-5">
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

            {/* Filtros */}
            <div className="flex-1 overflow-y-auto p-4">
              <ProductsSidebar
                selectedCollection={selectedCollection}
                onCollectionChange={onCollectionChange}
                selectedNetwork={selectedNetwork}
                onNetworkChange={onNetworkChange}
                onPriceApply={onPriceApply}
              />
            </div>

            {/* Rodapé */}
            <div className="border-t border-[#3F2319] p-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="
                  h-11 w-full rounded-md bg-primary
                  font-mono font-bold text-[#140D0A]
                  transition-colors hover:bg-primary-hover
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
