// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class DurationPropertySourceMap extends SimplePropertySourceMap {}

export class DurationProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | DurationPropertySourceMap;
}

export function durationPropertyFactory(): DurationProperty {
  return Object.assign(new DurationProperty(), defaultSimpleProperty(), {
    type: 'duration',
    sourceMap: new DurationPropertySourceMap(),
  });
}
