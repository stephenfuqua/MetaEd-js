import { Namespace } from './Namespace';
import { ModelType } from './ModelType';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

/**
 *
 */
export interface ModelBaseSourceMap {
  type: SourceMap;
  documentation: SourceMap;
  metaEdName: SourceMap;
  metaEdId: SourceMap;
}

/**
 *
 */
export function newModelBaseSourceMap() {
  return {
    type: NoSourceMap,
    documentation: NoSourceMap,
    metaEdName: NoSourceMap,
    metaEdId: NoSourceMap,
  };
}

/**
 *
 */
export interface ModelBase {
  type: ModelType;
  documentation: string;
  metaEdName: string;
  metaEdId: string;
  namespace: Namespace;
  data: any;
  config: any;
}
