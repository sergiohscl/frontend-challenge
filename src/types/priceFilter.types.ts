
export type PriceRange = {
  min: number;
  max: number;
};

export type PriceFilterProps = {
  minPrice?: number;
  maxPrice?: number;
  onApply: (range: PriceRange) => void;
};
