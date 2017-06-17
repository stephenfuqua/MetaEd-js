// @flow
import { namespaceInfoFactory } from './NamespaceInfo';
import { ModelBase } from './ModelBase';
import type { SourceMap } from './SourceMap';

export class SharedSimpleSourceMap {
  type: ?SourceMap;
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

export const NoSharedSimple: SharedSimple = Object.assign(defaultSharedSimple(), {
  metaEdName: 'NoSharedSimple',
});
