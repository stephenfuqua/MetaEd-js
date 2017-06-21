// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { EntityPropertySourceMap } from './EntityProperty';

export class PercentPropertySourceMap extends SimplePropertySourceMap {}

export class PercentProperty extends SimpleProperty {
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | PercentPropertySourceMap;
}

export function percentPropertyFactory(): PercentProperty {
  return Object.assign(new PercentProperty(), defaultSimpleProperty(), {
    type: 'percent',
    sourceMap: new PercentPropertySourceMap(),
  });
}
