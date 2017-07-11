// @flow
import { SimpleProperty, SimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
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

export function newIntegerProperty(): IntegerProperty {
  return Object.assign(new IntegerProperty(), newSimpleProperty(), {
    type: 'integer',
    typeHumanizedName: 'Integer Property',
    minValue: null,
    maxValue: null,
    sourceMap: new IntegerPropertySourceMap(),
  });
}

export const asIntegerProperty = (x: EntityProperty): IntegerProperty => ((x: any): IntegerProperty);
