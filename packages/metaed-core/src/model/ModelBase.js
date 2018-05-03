// @flow
import type { Namespace } from './Namespace';
import type { ModelType } from './ModelType';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

export type ModelBaseSourceMap = {
  type: SourceMap,
  documentation: SourceMap,
  metaEdName: SourceMap,
  metaEdId: SourceMap,
};

export function newModelBaseSourceMap() {
  return {
    type: NoSourceMap,
    documentation: NoSourceMap,
    metaEdName: NoSourceMap,
    metaEdId: NoSourceMap,
  };
}

export type ModelBase = {
  type: ModelType,
  documentation: string,
  metaEdName: string,
  metaEdId: string,
  namespace: Namespace,
  data: any,
  config: any,
};
