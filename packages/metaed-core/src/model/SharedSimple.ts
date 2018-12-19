import deepFreeze from 'deep-freeze';
import { NoNamespace } from './Namespace';
import { ModelBase } from './ModelBase';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

/**
 *
 */
export interface SharedSimpleSourceMap {
  type: SourceMap;
  documentation: SourceMap;
  metaEdName: SourceMap;
  metaEdId: SourceMap;
}

/**
 *
 */
export function newSharedSimpleSourceMap(): SharedSimpleSourceMap {
  return {
    type: NoSourceMap,
    documentation: NoSourceMap,
    metaEdName: NoSourceMap,
    metaEdId: NoSourceMap,
  };
}

export interface SharedSimple extends ModelBase {
  typeHumanizedName: string;
  sourceMap: SharedSimpleSourceMap;
}

/**
 *
 */
export function newSharedSimple(): SharedSimple {
  return {
    type: 'unknown',
    typeHumanizedName: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: NoNamespace,
    sourceMap: newSharedSimpleSourceMap(),
    data: {},
    config: {},
  };
}

/**
 *
 */
export const NoSharedSimple: SharedSimple = deepFreeze({
  ...newSharedSimple(),
  metaEdName: 'NoSharedSimple',
});
