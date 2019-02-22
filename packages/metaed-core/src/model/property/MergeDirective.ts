import deepFreeze from 'deep-freeze';
import { EntityProperty } from './EntityProperty';
import { SourceMap } from '../SourceMap';
import { NoSourceMap } from '../SourceMap';

/**
 *
 */
export type MergeDirectiveSourceMap = {
  type: SourceMap;
  sourcePropertyPathStrings: Array<SourceMap>;
  targetPropertyPathStrings: Array<SourceMap>;
  sourcePropertyChain: Array<SourceMap>;
  targetPropertyChain: Array<SourceMap>;
  sourceProperty: SourceMap;
  targetProperty: SourceMap;
};

/**
 *
 */
export function newMergeDirectiveSourceMap() {
  return {
    type: NoSourceMap,
    sourcePropertyPathStrings: [],
    targetPropertyPathStrings: [],
    sourcePropertyChain: [],
    targetPropertyChain: [],
    sourceProperty: NoSourceMap,
    targetProperty: NoSourceMap,
  };
}

/**
 *
 */
export type MergeDirective = {
  sourcePropertyPathStrings: Array<string>;
  targetPropertyPathStrings: Array<string>;
  sourcePropertyChain: Array<EntityProperty>;
  targetPropertyChain: Array<EntityProperty>;
  sourceProperty: EntityProperty | null;
  targetProperty: EntityProperty | null;
  sourceMap: MergeDirectiveSourceMap;
};

/**
 *
 */
export function newMergeDirective(): MergeDirective {
  return {
    sourcePropertyPathStrings: [],
    targetPropertyPathStrings: [],
    sourcePropertyChain: [],
    targetPropertyChain: [],
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
