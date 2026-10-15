
import type { CollectionFilterProps } from "../../types/collection.types";

export function CollectionFilter({
  collections,
  selectedCollection,
  onCollectionChange,
}: CollectionFilterProps) {
  return (
    <div className="flex w-full flex-col gap-3">
      <h3 className="font-mono text-lg leading-4 font-bold text-text-primary">
        Coleções
      </h3>

      <div className="flex flex-col px-3">
        {collections.map((collection) => {
          const isSelected =
            selectedCollection === collection.id;

          return (
            <button
              key={collection.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() =>
                onCollectionChange(
                  isSelected ? null : collection.id
                )
              }
              className={`flex h-10 w-full items-center justify-between text-left font-mono text-[15px] transition-colors ${
                isSelected
                  ? "font-bold text-primary"
                  : "text-text-muted hover:text-primary"
              }`}
            >
              <span>{collection.label}</span>
              <span>({collection.count})</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
