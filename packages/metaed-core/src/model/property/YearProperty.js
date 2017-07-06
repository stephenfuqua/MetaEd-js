// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class YearPropertySourceMap extends SimplePropertySourceMap {}

export class YearProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | YearPropertySourceMap;
}

export function newYearProperty(): YearProperty {
  return Object.assign(new YearProperty(), defaultSimpleProperty(), {
    type: 'year',
    sourceMap: new YearPropertySourceMap(),
  });
}

export const asYearProperty = (x: EntityProperty): YearProperty => ((x: any): YearProperty);
