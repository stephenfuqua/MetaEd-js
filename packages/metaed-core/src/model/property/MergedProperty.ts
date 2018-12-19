import deepFreeze from 'deep-freeze';
import { EntityProperty } from './EntityProperty';
import { NoEntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

/**
 *
 */
export type MergedPropertySourceMap = {
  type: SourceMap;
  mergePropertyPath: Array<SourceMap>;
  targetPropertyPath: Array<SourceMap>;
  mergeProperty: SourceMap;
  targetProperty: SourceMap;
};

/**
 *
 */
export function newMergedPropertySourceMap() {
  return {
    type: NoSourceMap,
    mergePropertyPath: [],
    targetPropertyPath: [],
    mergeProperty: NoSourceMap,
    targetProperty: NoSourceMap,
  };
}

/**
 *
 */
export type MergedProperty = {
  mergePropertyPath: Array<string>;
  targetPropertyPath: Array<string>;
  mergeProperty: EntityProperty | null;
  targetProperty: EntityProperty | null;
  sourceMap: MergedPropertySourceMap;
};

/**
 *
 */
export function newMergedProperty(): MergedProperty {
  return {
    mergePropertyPath: [],
    targetPropertyPath: [],
    mergeProperty: null,
    targetProperty: null,
    sourceMap: newMergedPropertySourceMap(),
  };
}

/**
 *
 */
export const NoMergedProperty: MergedProperty = deepFreeze({
  ...newMergedProperty(),
  mergeProperty: NoEntityProperty,
  targetProperty: NoEntityProperty,
});
