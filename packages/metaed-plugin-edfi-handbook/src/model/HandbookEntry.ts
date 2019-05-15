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

export interface HandbookEntry {
  definition: string;
  edFiId: string;
  uniqueIdentifier: string;
  entityType: string;
  modelReferencesContains: string[];
  modelReferencesContainsProperties: HandbookEntityReferenceProperty[];
  modelReferencesUsedBy: string[];
  modelReferencesUsedByProperties: HandbookEntityReferenceProperty[];
  name: string;
  odsFragment: string[];
  optionList: string[];
  typeCharacteristics: string[];
  xsdFragment: string;
  repositoryId: string;
  namespace: string;
  metaEdType: string;
}

export function newHandbookEntry(): HandbookEntry {
  return {
    definition: '',
    edFiId: '',
    uniqueIdentifier: '',
    entityType: '',
    modelReferencesContains: [],
    modelReferencesContainsProperties: [],
    modelReferencesUsedBy: [],
    modelReferencesUsedByProperties: [],
    name: '',
    odsFragment: [],
    optionList: [],
    typeCharacteristics: [],
    xsdFragment: '',
    repositoryId: '',
    namespace: '',
    metaEdType: '',
  };
}
