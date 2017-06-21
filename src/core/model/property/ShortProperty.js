// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap } from './EntityProperty';

export class ShortPropertySourceMap extends SimplePropertySourceMap {
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class ShortProperty extends SimpleProperty {
  minValue: ?string;
  maxValue: ?string;
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | ShortPropertySourceMap;
}

export function shortPropertyFactory(): ShortProperty {
  return Object.assign(new ShortProperty(), defaultSimpleProperty(), {
    type: 'short',
    minValue: null,
    maxValue: null,
    sourceMap: new ShortPropertySourceMap(),
  });
}
