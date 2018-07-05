// @flow
import type { SimpleProperty, SimplePropertySourceMap } from './SimpleProperty';
import { newSimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import type { EntityProperty } from './EntityProperty';

export type DatetimePropertySourceMap = SimplePropertySourceMap;

export function newDatetimePropertySourceMap(): DatetimePropertySourceMap {
  return newSimplePropertySourceMap();
}

export type DatetimeProperty = {
  sourceMap: DatetimePropertySourceMap,
  ...$Exact<SimpleProperty>,
};

export function newDatetimeProperty(): DatetimeProperty {
  return {
    ...newSimpleProperty(),
    type: 'datetime',
    typeHumanizedName: 'Datetime Property',
    sourceMap: newDatetimePropertySourceMap(),
  };
}

export const asDatetimeProperty = (x: EntityProperty): DatetimeProperty => ((x: any): DatetimeProperty);
