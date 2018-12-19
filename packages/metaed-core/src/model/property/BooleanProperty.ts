import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type BooleanPropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newBooleanPropertySourceMap(): BooleanPropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface BooleanProperty extends SimpleProperty {
  sourceMap: BooleanPropertySourceMap;
}

/**
 *
 */
export function newBooleanProperty(): BooleanProperty {
  return {
    ...newSimpleProperty(),
    type: 'boolean',
    typeHumanizedName: 'Boolean Property',
    sourceMap: newBooleanPropertySourceMap(),
  };
}

/**
 *
 */
export const asBooleanProperty = (x: EntityProperty): BooleanProperty => x as BooleanProperty;
