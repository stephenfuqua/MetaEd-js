// @flow
import deepFreeze from 'deep-freeze';
import type { SourceMap } from './SourceMap';
import { NoSourceMap } from './SourceMap';
import type { ModelType } from './ModelType';

export type NamespaceSourceMap = {
  type: SourceMap,
  namespaceName: SourceMap,
  isExtension: SourceMap,
  projectExtension: SourceMap,
  projectName: SourceMap,
  extensionEntitySuffix: SourceMap,
};

export function newNamespaceSourceMap(): NamespaceSourceMap {
  return {
    type: NoSourceMap,
    namespaceName: NoSourceMap,
    isExtension: NoSourceMap,
    projectExtension: NoSourceMap,
    projectName: NoSourceMap,
    extensionEntitySuffix: NoSourceMap,
  };
}

export type Namespace = {
  type: ModelType,
  namespaceName: string,
  isExtension: boolean,
  projectExtension: string,
  projectName: string,
  extensionEntitySuffix: string,
  sourceMap: NamespaceSourceMap,
  data: any,
  config: any,
};

export const DefaultExtensionEntitySuffix: string = 'Extension';

export function newNamespace(): Namespace {
  return {
    type: 'namespace',
    namespaceName: '',
    isExtension: false,
    projectExtension: '',
    projectName: '',
    extensionEntitySuffix: DefaultExtensionEntitySuffix,
    sourceMap: newNamespaceSourceMap(),
    data: {},
    config: {},
  };
}

export const NoNamespace: Namespace = deepFreeze({
  ...newNamespace(),
  namespaceName: 'nonamespace',
  projectExtension: 'NoNamespace',
});
