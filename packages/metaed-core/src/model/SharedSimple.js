// @flow
import deepFreeze from 'deep-freeze';
import { NoNamespace } from './Namespace';
import type { ModelBase } from './ModelBase';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export type SharedSimpleSourceMap = {
  type: SourceMap,
  documentation: SourceMap,
  metaEdName: SourceMap,
  metaEdId: SourceMap,
};

export function newSharedSimpleSourceMap(): SharedSimpleSourceMap {
  return {
    type: NoSourceMap,
    documentation: NoSourceMap,
    metaEdName: NoSourceMap,
    metaEdId: NoSourceMap,
  };
}

export type SharedSimple = {
  ...$Exact<ModelBase>,
  typeHumanizedName: string,
  sourceMap: SharedSimpleSourceMap,
};

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

export const NoSharedSimple: SharedSimple = deepFreeze({
  ...newSharedSimple(),
  metaEdName: 'NoSharedSimple',
});
