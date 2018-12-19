import { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import { EntityProperty } from './EntityProperty';

/**
 *
 */
export type DatetimePropertySourceMap = SimplePropertySourceMap;

/**
 *
 */
export function newDatetimePropertySourceMap(): DatetimePropertySourceMap {
  return newSimplePropertySourceMap();
}

export interface DatetimeProperty extends SimpleProperty {
  sourceMap: DatetimePropertySourceMap;
}

/**
 *
 */
export function newDatetimeProperty(): DatetimeProperty {
  return {
    ...newSimpleProperty(),
    type: 'datetime',
    typeHumanizedName: 'Datetime Property',
    sourceMap: newDatetimePropertySourceMap(),
  };
}

/**
 *
 */
export const asDatetimeProperty = (x: EntityProperty): DatetimeProperty => x as DatetimeProperty;
