// @flow
import type { MetaEdEnvironment, Namespace } from 'metaed-core';

export function initializeNamespaceDependencies(
  metaEd: MetaEdEnvironment,
  namespaceName: string,
  extensionNamespaceName: string,
) {
  const coreNamespace: ?Namespace = metaEd.namespace.get(namespaceName);
  if (coreNamespace == null) throw new Error();
  const extensionNamespace: ?Namespace = metaEd.namespace.get(extensionNamespaceName);
  if (extensionNamespace == null) throw new Error();
  extensionNamespace.dependencies.push(coreNamespace);
}
