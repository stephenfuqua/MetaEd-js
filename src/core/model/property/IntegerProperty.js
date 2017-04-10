// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../ModelBase';

export class IntegerPropertySourceMap extends SimplePropertySourceMap {
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class IntegerProperty extends SimpleProperty {
  minValue: ?string;
  maxValue: ?string;
  sourceMap: IntegerPropertySourceMap;
}

export function integerPropertyFactory(): IntegerProperty {
  return Object.assign(new IntegerProperty(), defaultSimpleProperty(), {
    type: 'integer',
    minValue: null,
    maxValue: null,
    sourceMap: new IntegerPropertySourceMap(),
  });
}
