import deepFreeze from 'deep-freeze';
import { NoNamespace } from './Namespace';
import { ModelBase, newModelBase, ModelBaseSourceMap, newModelBaseSourceMap } from './ModelBase';
import { SimpleProperty } from './property/SimpleProperty';

/**
 *
 */
export type SharedSimpleSourceMap = ModelBaseSourceMap;

/**
 *
 */
export function newSharedSimpleSourceMap(): SharedSimpleSourceMap {
  return newModelBaseSourceMap();
}

export interface SharedSimple extends ModelBase {
  typeHumanizedName: string;
  inReferences: SimpleProperty[];
  sourceMap: SharedSimpleSourceMap;
}

/**
 *
 */
export function newSharedSimple(): SharedSimple {
  return {
    ...newModelBase(),
    typeHumanizedName: 'unknown',
    namespace: NoNamespace,
    inReferences: [],
    sourceMap: newSharedSimpleSourceMap(),
  };
}

/**
 *
 */
export const NoSharedSimple: SharedSimple = deepFreeze({
  ...newSharedSimple(),
  metaEdName: 'NoSharedSimple',
});
