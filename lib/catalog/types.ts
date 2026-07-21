export type CatalogKind = "expense" | "income";

export type CanonicalCategory = {
  id: string;
  name: string;
  parentId: string | null;
  kind: CatalogKind;
  icon: string;
  color: string;
  isLeaf: boolean;
};

