export interface HandbookMergeProperty {
  propertyPath: string[];
  targetPath: string[];
}

export interface HandbookEntityReferenceProperty {
  metaEdId: string;
  targetPropertyId: string;
  referenceUniqueIdentifier: string;
  name: string;
  deprecationText: string;
  umlDatatype: string;
  jsonDatatype: string;
  xsdDatatype: string;
  metaEdDatatype: string;
  sqlDatatype: string;
  isIdentity: boolean;
  isOdsApiIdentity: boolean;
  cardinality: string;
  definition: string;
  mergeDirectives?: HandbookMergeProperty[];
}
