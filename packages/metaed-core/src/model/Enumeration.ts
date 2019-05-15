import { TopLevelEntity, TopLevelEntitySourceMap } from './TopLevelEntity';
import { newTopLevelEntity, newTopLevelEntitySourceMap } from './TopLevelEntity';
import { EnumerationItem } from './EnumerationItem';
import { SourceMap } from './SourceMap';
import { ModelBase } from './ModelBase';

export interface EnumerationSourceMap extends TopLevelEntitySourceMap {
  enumerationItems: SourceMap[];
}

/**
 *
 */
export function newEnumerationSourceMap(): EnumerationSourceMap {
  return {
    ...newTopLevelEntitySourceMap(),
    enumerationItems: [],
  };
}

export interface Enumeration extends TopLevelEntity {
  sourceMap: EnumerationSourceMap;
  enumerationItems: EnumerationItem[];
}

/**
 *
 */
export function newEnumeration(): Enumeration {
  return {
    ...newTopLevelEntity(),
    type: 'enumeration',
    typeHumanizedName: 'Enumeration',
    enumerationItems: [],
    sourceMap: newEnumerationSourceMap(),
  };
}

/**
 *
 */
export const asEnumeration = (x: ModelBase): Enumeration => x as Enumeration;
