// @flow
import type { NamespaceInfo } from './NamespaceInfo';
import type { ModelType } from './ModelType';
import type { SourceMap } from './SourceMap';

export class ModelBaseSourceMap {
  type: ?SourceMap;
  documentation: ?SourceMap;
  metaEdName: ?SourceMap;
  metaEdId: ?SourceMap;
  namespaceInfo: ?SourceMap;
}

export class ModelBase {
  type: ModelType;
  documentation: string;
  metaEdName: string;
  metaEdId: string;
  namespaceInfo: NamespaceInfo;
}
