// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class YearPropertySourceMap extends SimplePropertySourceMap {}

export class YearProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | YearPropertySourceMap;
}

export function yearPropertyFactory(): YearProperty {
  return Object.assign(new YearProperty(), defaultSimpleProperty(), {
    type: 'year',
    sourceMap: new YearPropertySourceMap(),
  });
}
