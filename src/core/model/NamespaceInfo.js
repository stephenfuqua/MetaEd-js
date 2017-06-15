// @flow
import type { SourceMap } from './SourceMap';

export class NamespaceInfoSourceMap {
  type: ?SourceMap;
  namespace: ?SourceMap;
  isExtension: ?SourceMap;
  projectExtension: ?SourceMap;
  extensionEntitySuffix: ?SourceMap;
}

export class NamespaceInfo {
  namespace: string;
  isExtension: boolean;
  projectExtension: string;
  extensionEntitySuffix: string;
  sourceMap: NamespaceInfoSourceMap;
}

export const DefaultExtensionEntitySuffix: string = 'Extension';

export function defaultNamespaceInfoFields() {
  return {
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
