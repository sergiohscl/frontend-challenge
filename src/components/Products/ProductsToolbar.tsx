import type {
  ProductSort,
  ProductTab,
  ProductsToolbarProps,
} from "../../types/productsToolbar.types";

const tabs: { id: ProductTab; label: string }[] = [
  { id: "all", label: "Todos os NFTs" },
  { id: "new", label: "Novos lançamentos" },
  { id: "trending", label: "Em alta" },
];

export function ProductsToolbar({
  activeTab,
  onTabChange,
  sortBy,
  onSortChange,
}: ProductsToolbarProps) {
  return (
    <div
      className="
        flex w-full flex-col gap-5
        lg:flex-row lg:items-start lg:justify-between
      "
    >
      {/* Abas */}
      <div
        role="tablist"
        aria-label="Categorias de NFTs"
        className="
          flex w-full items-start gap-4
          overflow-x-auto whitespace-nowrap
          lg:w-auto lg:gap-5 lg:overflow-visible
        "
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              id={`nft-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="nft-products-panel"
              onClick={() => onTabChange(tab.id)}
              className={`
                relative shrink-0
                pb-1 font-mono text-sm leading-4
                transition-colors
                lg:pb-3 lg:text-[15px]
                ${
                  isActive
                    ? "font-bold text-[#E89B55]"
                    : "font-normal text-[#F5F1EB] hover:text-[#E89B55]"
                }
              `}
            >
              {tab.label}

              {isActive && (
                <span
                  aria-hidden="true"
                  className="
                    absolute right-0 bottom-0 left-0
                    h-0.5 bg-[#D28A4C]
                  "
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Ordenação - apenas desktop */}
      <div
        className="
          hidden items-center gap-1
          font-mono text-[15px] text-[#F5F1EB]
          lg:flex
        "
      >
        <label htmlFor="nft-sort" className="shrink-0">
          Ordenar por:
        </label>

        <div className="relative min-w-0">
          <select
            id="nft-sort"
            value={sortBy}
            onChange={(event) =>
              onSortChange(event.target.value as ProductSort)
            }
            className="
              w-auto cursor-pointer appearance-none
              bg-transparent py-1 pr-6 pl-1
              font-mono text-[15px] text-[#F5F1EB]
              outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              [&>option]:bg-[#241612]
            "
          >
            <option value="default">Destaques</option>

            <option value="recent">Listados recentemente</option>

            <option value="price-asc">Menor preço</option>

            <option value="price-desc">Maior preço</option>
          </select>

          {/* Seta */}
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            className="
              pointer-events-none absolute
              top-1/2 right-0 size-4
              -translate-y-1/2
            "
          >
            <path
              d="M3.5 6L8 10L12.5 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
