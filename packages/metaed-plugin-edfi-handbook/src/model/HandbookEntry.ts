import { HandbookEntityReferenceProperty } from './HandbookEntryReferenceProperty';

export interface HandbookEntry {
  definition: string;
  deprecationText: string;
  metaEdId: string;
  uniqueIdentifier: string;

  umlType: string;
  metaEdType: string;
  baseMetaEdType: string;
  showIdentityColumn: boolean;

  baseEntityUniqueIdentifier: string;
  modelReferencesContains: string[];
  modelReferencesContainsProperties: HandbookEntityReferenceProperty[];
  modelReferencesUsedBy: string[];
  modelReferencesUsedByProperties: HandbookEntityReferenceProperty[];
  name: string;
  optionList: string[];
  typeCharacteristics: string[];
  repositoryId: string;
  projectName: string;
}

export function newHandbookEntry(): HandbookEntry {
  return {
    definition: '',
    deprecationText: '',
    metaEdId: '',
    uniqueIdentifier: '',

    umlType: '',
    metaEdType: '',
    baseMetaEdType: '',
    showIdentityColumn: true,

    baseEntityUniqueIdentifier: '',
    modelReferencesContains: [],
    modelReferencesContainsProperties: [],
    modelReferencesUsedBy: [],
    modelReferencesUsedByProperties: [],
    name: '',
    optionList: [],
    typeCharacteristics: [],
    repositoryId: '',
    projectName: '',
  };
}
