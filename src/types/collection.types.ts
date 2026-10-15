
export type CollectionOption = {
  id: string;
  label: string;
  count: number;
};

export type CollectionFilterProps = {
  collections: CollectionOption[];
  selectedCollection: string | null;
  onCollectionChange: (collectionId: string | null) => void;
};
