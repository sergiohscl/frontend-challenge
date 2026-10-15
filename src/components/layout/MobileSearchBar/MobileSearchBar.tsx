import { useState } from "react";

type MobileSearchBarProps = {
  onSearch?: (query: string) => void;
  onOpenFilters?: () => void;
};

export function MobileSearchBar({
  onSearch,
  onOpenFilters,
}: MobileSearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 px-4 py-4 lg:hidden">
      <form
        role="search"
        className="flex flex-1 items-center gap-2 rounded-xl bg-surface px-3 py-3"
        onSubmit={(event) => {
          event.preventDefault();
          onSearch?.(query.trim());
        }}
      >
        <span aria-hidden="true" className="text-primary">
          ⌕
        </span>

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Explorar coleções"
          aria-label="Pesquisar coleções"
          className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-text-muted"
        />
      </form>

      <button
        type="button"
        onClick={onOpenFilters}
        aria-label="Abrir filtros"
        className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-background"
      >
        ☷
      </button>
    </div>
  );
}
