// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class DatePropertySourceMap extends SimplePropertySourceMap {}

export class DateProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | DatePropertySourceMap;
}

export function datePropertyFactory(): DateProperty {
  return Object.assign(new DateProperty(), defaultSimpleProperty(), {
    type: 'date',
    sourceMap: new DatePropertySourceMap(),
  });
}

export const asDateProperty = (x: EntityProperty): DateProperty => ((x: any): DateProperty);
