// @flow
import { SimpleProperty, SimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class DatePropertySourceMap extends SimplePropertySourceMap {}

export class DateProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | DatePropertySourceMap;
}

export function newDateProperty(): DateProperty {
  return Object.assign(new DateProperty(), newSimpleProperty(), {
    type: 'date',
    typeHumanizedName: 'Date Property',
    sourceMap: new DatePropertySourceMap(),
  });
}

export const asDateProperty = (x: EntityProperty): DateProperty => ((x: any): DateProperty);
