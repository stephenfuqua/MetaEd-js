import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type DatePropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newDatePropertySourceMap(): DatePropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface DateProperty extends SimpleProperty {
  sourceMap: DatePropertySourceMap;
}

/**
 *
 */
export function newDateProperty(): DateProperty {
  return {
    ...newSimpleProperty(),
    type: 'date',
    typeHumanizedName: 'Date Property',
    sourceMap: newDatePropertySourceMap(),
  };
}

/**
 *
 */
export const asDateProperty = (x: EntityProperty): DateProperty => x as DateProperty;
