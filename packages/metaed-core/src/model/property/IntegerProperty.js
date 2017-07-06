// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class IntegerPropertySourceMap extends SimplePropertySourceMap {
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class IntegerProperty extends SimpleProperty {
  minValue: ?string;
  maxValue: ?string;
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | IntegerPropertySourceMap;
}

export function newIntegerCommonProperty(): IntegerProperty {
  return Object.assign(new IntegerProperty(), defaultSimpleProperty(), {
    type: 'integer',
    minValue: null,
    maxValue: null,
    sourceMap: new IntegerPropertySourceMap(),
  });
}

export const asIntegerProperty = (x: EntityProperty): IntegerProperty => ((x: any): IntegerProperty);
