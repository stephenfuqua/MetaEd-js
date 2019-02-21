import deepFreeze from 'deep-freeze';
import { EntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

/**
 *
 */
export type MergeDirectiveSourceMap = {
  type: SourceMap;
  sourcePropertyPath: Array<SourceMap>;
  targetPropertyPath: Array<SourceMap>;
  sourceProperty: SourceMap;
  targetProperty: SourceMap;
};

/**
 *
 */
export function newMergeDirectiveSourceMap() {
  return {
    type: NoSourceMap,
    sourcePropertyPath: [],
    targetPropertyPath: [],
    sourceProperty: NoSourceMap,
    targetProperty: NoSourceMap,
  };
}

/**
 *
 */
export type MergeDirective = {
  sourcePropertyPath: Array<string>;
  targetPropertyPath: Array<string>;
  sourceProperty: EntityProperty | null;
  targetProperty: EntityProperty | null;
  sourceMap: MergeDirectiveSourceMap;
};

/**
 *
 */
export function newMergeDirective(): MergeDirective {
  return {
    sourcePropertyPath: [],
    targetPropertyPath: [],
    sourceProperty: null,
    targetProperty: null,
    sourceMap: newMergeDirectiveSourceMap(),
  };
}

/**
 *
 */
export const NoMergeDirective: MergeDirective = deepFreeze({
  ...newMergeDirective(),
});
