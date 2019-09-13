import { HandbookEntityReferenceProperty } from './HandbookEntryReferenceProperty';

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
  projectName: string;
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
    projectName: '',
    metaEdType: '',
  };
}
