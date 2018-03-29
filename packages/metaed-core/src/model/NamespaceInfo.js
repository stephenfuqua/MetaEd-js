// @flow
import type { SourceMap } from './SourceMap';
import type { ModelType } from './ModelType';

export class NamespaceInfoSourceMap {
  type: ?SourceMap;
  namespace: ?SourceMap;
  isExtension: ?SourceMap;
  projectExtension: ?SourceMap;
  projectName: ?SourceMap;
  extensionEntitySuffix: ?SourceMap;
}

export class NamespaceInfo {
  type: ModelType;
  namespace: string;
  isExtension: boolean;
  projectExtension: string;
  projectName: string;
  extensionEntitySuffix: string;
  sourceMap: NamespaceInfoSourceMap;
  data: any;
  config: any;
}

export const DefaultExtensionEntitySuffix: string = 'Extension';

export function defaultNamespaceInfoFields() {
  return {
    type: 'namespaceInfo',
    namespace: '',
    isExtension: false,
    projectExtension: '',
    projectName: '',
    extensionEntitySuffix: DefaultExtensionEntitySuffix,
    sourceMap: new NamespaceInfoSourceMap(),
    data: {},
  };
}

export function newNamespaceInfo(): NamespaceInfo {
  return Object.assign(new NamespaceInfo(), defaultNamespaceInfoFields());
}

export const NoNamespaceInfo: NamespaceInfo = Object.assign(newNamespaceInfo(), {
  namespace: 'nonamespaceinfo',
  projectExtension: 'NoNamespaceInfo',
});
