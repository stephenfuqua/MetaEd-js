import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type PercentPropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newPercentPropertySourceMap(): PercentPropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface PercentProperty extends SimpleProperty {
  sourceMap: PercentPropertySourceMap;
}

/**
 *
 */
export function newPercentProperty(): PercentProperty {
  return {
    ...newSimpleProperty(),
    type: 'percent',
    typeHumanizedName: 'Percent Property',
    sourceMap: newPercentPropertySourceMap(),
  };
}

/**
 *
 */
export const asPercentProperty = (x: EntityProperty): PercentProperty => x as PercentProperty;
