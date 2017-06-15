// @flow
import { SimpleProperty, SimplePropertySourceMap, defaultSimpleProperty } from './SimpleProperty';
import type { SourceMap } from './../SourceMap';

export class StringPropertySourceMap extends SimplePropertySourceMap {
  minLength: ?SourceMap;
  maxLength: ?SourceMap;
}

export class StringProperty extends SimpleProperty {
  minLength: ?string;
  maxLength: ?string;
  sourceMap: StringPropertySourceMap;
}

export function stringPropertyFactory(): StringProperty {
  return Object.assign(new StringProperty(), defaultSimpleProperty(), {
    type: 'string',
    minLength: null,
    maxLength: null,
    sourceMap: new StringPropertySourceMap(),
  });
}
