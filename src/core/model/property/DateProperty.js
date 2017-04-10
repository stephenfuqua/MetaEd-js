// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class DatePropertySourceMap extends SimplePropertySourceMap {}

export class DateProperty extends SimpleProperty {
  sourceMap: DatePropertySourceMap;
}

export function datePropertyFactory(): DateProperty {
  return Object.assign(new DateProperty(), defaultSimpleProperty(), {
    type: 'date',
    sourceMap: new DatePropertySourceMap(),
  });
}
