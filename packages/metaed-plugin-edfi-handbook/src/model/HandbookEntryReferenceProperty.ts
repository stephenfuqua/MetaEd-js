export interface HandbookMergeProperty {
  propertyPath: string[];
  targetPath: string[];
}

export interface HandbookEntityReferenceProperty {
  edFiId: string;
  targetPropertyId: string;
  referenceUniqueIdentifier: string;
  name: string;
  dataType: string;
  isIdentity: boolean;
  cardinality: string;
  definition: string;
  mergeDirectives?: HandbookMergeProperty[];
}
