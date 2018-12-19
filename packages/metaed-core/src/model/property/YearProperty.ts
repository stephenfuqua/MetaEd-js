import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type YearPropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newYearPropertySourceMap(): YearPropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface YearProperty extends SimpleProperty {
  sourceMap: YearPropertySourceMap;
}

/**
 *
 */
export function newYearProperty(): YearProperty {
  return {
    ...newSimpleProperty(),
    type: 'year',
    typeHumanizedName: 'Year Property',
    sourceMap: newYearPropertySourceMap(),
  };
}

/**
 *
 */
export const asYearProperty = (x: EntityProperty): YearProperty => x as YearProperty;
