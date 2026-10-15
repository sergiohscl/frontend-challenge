import { useState } from "react";
import { Search } from "lucide-react";

import type { ReactNode } from "react";

type MobileSearchBarProps = {
  onSearch?: (query: string) => void;
  filtersButton?: ReactNode;
};

export function MobileSearchBar({
  onSearch,
  filtersButton,
}: MobileSearchBarProps) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex items-center gap-2 px-4 py-4 lg:hidden">
      <form
        role="search"
        className="
          flex min-w-0 flex-1 items-center gap-2
          rounded-xl bg-surface px-3 py-3
        "
        onSubmit={(event) => {
          event.preventDefault();
          onSearch?.(query.trim());
        }}
      >
        <Search
          size={18}
          aria-hidden="true"
          className="shrink-0 text-primary"
        />

        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Explorar coleções"
          aria-label="Pesquisar coleções"
          className="
            min-w-0 w-full bg-transparent
            text-sm text-text-primary
            outline-none placeholder:text-text-muted
          "
        />
      </form>

      {filtersButton}
    </div>
  );
}
