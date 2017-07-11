// @flow
import { SimpleProperty, SimplePropertySourceMap, newSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class ShortPropertySourceMap extends SimplePropertySourceMap {
  minValue: ?SourceMap;
  maxValue: ?SourceMap;
}

export class ShortProperty extends SimpleProperty {
  minValue: ?string;
  maxValue: ?string;
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | ShortPropertySourceMap;
}

export function newShortProperty(): ShortProperty {
  return Object.assign(new ShortProperty(), newSimpleProperty(), {
    type: 'short',
    typeHumanizedName: 'Short Property',
    minValue: null,
    maxValue: null,
    sourceMap: new ShortPropertySourceMap(),
  });
}

export const asShortProperty = (x: EntityProperty): ShortProperty => ((x: any): ShortProperty);
