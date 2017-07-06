// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../SourceMap';
import type { EntityPropertySourceMap, EntityProperty } from './EntityProperty';

export class StringPropertySourceMap extends SimplePropertySourceMap {
  minLength: ?SourceMap;
  maxLength: ?SourceMap;
}

export class StringProperty extends SimpleProperty {
  minLength: ?string;
  maxLength: ?string;
  sourceMap: EntityPropertySourceMap | SimplePropertySourceMap | StringPropertySourceMap;
}

export function newStringProperty(): StringProperty {
  return Object.assign(new StringProperty(), defaultSimpleProperty(), {
    type: 'string',
    minLength: null,
    maxLength: null,
    sourceMap: new StringPropertySourceMap(),
  });
}

export const asStringProperty = (x: EntityProperty): StringProperty => ((x: any): StringProperty);
