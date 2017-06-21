// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class BooleanPropertySourceMap extends SimplePropertySourceMap {}

export class BooleanProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | BooleanPropertySourceMap;
}

export function booleanPropertyFactory(): BooleanProperty {
  return Object.assign(new BooleanProperty(), defaultSimpleProperty(), {
    type: 'boolean',
    sourceMap: new BooleanPropertySourceMap(),
  });
}
