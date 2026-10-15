
import { ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const maxVisiblePages = 4;

  const startPage = Math.max(
    1,
    Math.min(
      currentPage - 1,
      totalPages - maxVisiblePages + 1,
    ),
  );

  const visiblePages = Array.from(
    {
      length: Math.min(totalPages, maxVisiblePages),
    },
    (_, index) => startPage + index,
  );

  return (
    <nav
      aria-label="Paginação de NFTs"
      className="flex w-full justify-end"
    >
      <div className="flex items-center gap-2">
        {visiblePages.map((page) => {
          const isActive = currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Ir para página ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={`
                flex size-8.75 items-center justify-center
                rounded-sm border font-mono text-lg
                leading-4 font-bold transition-colors
                ${
                  isActive
                    ? "border-[#D28A4C] bg-[#D28A4C] text-[#140D0A]"
                    : "border-[#3F2319] bg-transparent text-[#F5F1EB] hover:border-[#D28A4C]"
                }
              `}
            >
              {page}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          aria-label="Próxima página"
          className="
            flex size-8.75 items-center justify-center
            rounded-sm border border-[#3F2319]
            text-[#F5F1EB] transition-colors
            hover:border-[#D28A4C]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </nav>
  );
}
