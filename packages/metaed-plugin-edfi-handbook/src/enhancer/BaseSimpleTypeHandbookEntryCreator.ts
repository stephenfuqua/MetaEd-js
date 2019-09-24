import { HandbookEntry, newHandbookEntry } from '../model/HandbookEntry';

export function createDefaultHandbookEntry(metaEdId: string, name: string, definition: string): HandbookEntry {
  return {
    ...newHandbookEntry(),
    definition,
    metaEdId,
    // This is the way the UI seaches for entities
    uniqueIdentifier: name + metaEdId,
    metaEdType: `${name} Base Type`,
    modelReferencesUsedBy: [],
    umlType: name,
    name,
    projectName: 'EdFi',
    optionList: [],
    typeCharacteristics: [],
  };
}
