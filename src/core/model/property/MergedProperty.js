// @flow
import type { EntityProperty } from './EntityProperty';
import type { SourceMap } from './../ModelBase';

export class MergedPropertySourceMap {
  type: ?SourceMap;
  mergePropertyPath: ?Array<SourceMap>;
  targetPropertyPath: ?Array<SourceMap>;
  mergeProperty: ?SourceMap;
  targetProperty: ?SourceMap;
}

export class MergedProperty {
  mergePropertyPath: Array<string>;
  targetPropertyPath: Array<string>;
  mergeProperty: ?EntityProperty;
  targetProperty: ?EntityProperty;
  sourceMap: MergedPropertySourceMap;
}

export function defaultMergedProperty(): MergedProperty {
  return Object.assign(new MergedProperty(), {
    mergePropertyPath: [],
    targetPropertyPath: [],
    mergeProperty: null,
    targetProperty: null,
    sourceMap: new MergedPropertySourceMap(),
  });
}
