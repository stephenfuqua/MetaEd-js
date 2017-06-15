// @flow
import { namespaceInfoFactory } from './NamespaceInfo';
import { ModelBase } from './ModelBase';
import type { ModelType } from './ModelType';
import type { SourceMap } from './SourceMap';

export class SharedSimpleSourceMap {
  type: ?ModelType;
  documentation: ?SourceMap;
  metaEdName: ?SourceMap;
  metaEdId: ?SourceMap;
  namespaceInfo: ?SourceMap;
}

export class SharedSimple extends ModelBase {
  typeGroupHumanizedName: string;
}

export function defaultSharedSimple(): SharedSimple {
  return Object.assign(new SharedSimple(), {
    type: 'unknown',
    typeGroupHumanizedName: 'unknown',
    documentation: '',
    metaEdName: '',
    metaEdId: '',
    namespaceInfo: namespaceInfoFactory(),
  });
}
