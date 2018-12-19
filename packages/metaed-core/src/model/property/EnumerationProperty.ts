import { ReferentialProperty, ReferentialPropertySourceMap } from './ReferentialProperty';
import { newReferentialProperty, newReferentialPropertySourceMap } from './ReferentialProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type EnumerationPropertySourceMap = ReferentialPropertySourceMap;

/**
 *
 */
export function newEnumerationPropertySourceMap(): EnumerationPropertySourceMap {
  return {
    ...newReferentialPropertySourceMap(),
  };
}

export interface EnumerationProperty extends ReferentialProperty {
  sourceMap: EnumerationPropertySourceMap;
}

/**
 *
 */
export function newEnumerationProperty(): EnumerationProperty {
  return {
    ...newReferentialProperty(),
    type: 'enumeration',
    typeHumanizedName: 'Enumeration Property',
    sourceMap: newEnumerationPropertySourceMap(),
  };
}

/**
 *
 */
export const asEnumerationProperty = (x: EntityProperty): EnumerationProperty => x as EnumerationProperty;
