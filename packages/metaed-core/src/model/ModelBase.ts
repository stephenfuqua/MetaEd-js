import deepFreeze from 'deep-freeze';
import { Namespace, NoNamespace } from './Namespace';
import { ModelType } from './ModelType';
import { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';

/**
 *
 */
export interface ModelBaseSourceMap {
  type: SourceMap;
  isDeprecated: SourceMap;
  deprecationReason: SourceMap;
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
    isDeprecated: NoSourceMap,
    deprecationReason: NoSourceMap,
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
  isDeprecated: boolean;
  deprecationReason: string;
  documentation: string;
  metaEdName: string;
  metaEdId: string;
  namespace: Namespace;
  data: any;
  config: any;
}

/**
 *
 */
export function newModelBase(): ModelBase {
  return {
    type: 'unknown',
    isDeprecated: false,
    deprecationReason: '',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespace: NoNamespace,
    data: {},
    config: {},
  };
}

/**
 *
 */
export const NoModelBase: ModelBase = deepFreeze({
  ...newModelBase(),
  metaEdName: 'NoModelBase',
});
