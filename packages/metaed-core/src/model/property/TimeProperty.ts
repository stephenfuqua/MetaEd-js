import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type TimePropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newTimePropertySourceMap(): TimePropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface TimeProperty extends SimpleProperty {
  sourceMap: TimePropertySourceMap;
}

/**
 *
 */
export function newTimeProperty(): TimeProperty {
  return {
    ...newSimpleProperty(),
    type: 'time',
    typeHumanizedName: 'Time Property',
    sourceMap: newTimePropertySourceMap(),
  };
}

/**
 *
 */
export const asTimeProperty = (x: EntityProperty): TimeProperty => x as TimeProperty;
