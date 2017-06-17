// @flow
import type { SourceMap } from './SourceMap';
import type { ModelType } from './ModelType';

export class NamespaceInfoSourceMap {
  type: ?SourceMap;
  namespace: ?SourceMap;
  isExtension: ?SourceMap;
  projectExtension: ?SourceMap;
  extensionEntitySuffix: ?SourceMap;
}

export class NamespaceInfo {
  type: ModelType;
  namespace: string;
  isExtension: boolean;
  projectExtension: string;
  extensionEntitySuffix: string;
  sourceMap: NamespaceInfoSourceMap;
}

export const DefaultExtensionEntitySuffix: string = 'Extension';

export function defaultNamespaceInfoFields() {
  return {
    type: 'namespaceInfo',
    namespace: '',
    isExtension: false,
    projectExtension: '',
    extensionEntitySuffix: DefaultExtensionEntitySuffix,
    sourceMap: new NamespaceInfoSourceMap(),
  };
}

export function namespaceInfoFactory(): NamespaceInfo {
  return Object.assign(new NamespaceInfo(), defaultNamespaceInfoFields());
}

export const NoNamespaceInfo: NamespaceInfo = Object.assign(namespaceInfoFactory(), {
  namespace: 'nonamespaceinfo',
  projectExtension: 'NoNamespaceInfo',
});
