export type ProductTab = "all" | "new" | "trending";

export type ProductSort =
  | "default"
  | "recent"
  | "price-asc"
  | "price-desc";

export type ProductsToolbarProps = {
  activeTab: ProductTab;
  onTabChange: (tab: ProductTab) => void;
  sortBy: ProductSort;
  onSortChange: (sort: ProductSort) => void;
};
