// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';

export class BooleanPropertySourceMap extends SimplePropertySourceMap {}

export class BooleanProperty extends SimpleProperty {
  sourceMap: BooleanPropertySourceMap;
}

export function booleanPropertyFactory(): BooleanProperty {
  return Object.assign(new BooleanProperty(), defaultSimpleProperty(), {
    type: 'boolean',
    sourceMap: new BooleanPropertySourceMap(),
  });
}
