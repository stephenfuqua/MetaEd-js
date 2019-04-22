import deepFreeze from 'deep-freeze';
import { NoNamespace } from './Namespace';
import { ModelBase } from './ModelBase';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import { EntityProperty } from './property/EntityProperty';

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
  inReferences: Array<EntityProperty>;
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
    inReferences: [],
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
