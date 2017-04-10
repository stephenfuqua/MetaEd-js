// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class YearPropertySourceMap extends SimplePropertySourceMap {}

export class YearProperty extends SimpleProperty {
  sourceMap: YearPropertySourceMap;
}

export function yearPropertyFactory(): YearProperty {
  return Object.assign(new YearProperty(), defaultSimpleProperty(), {
    type: 'year',
    sourceMap: new YearPropertySourceMap(),
  });
}
