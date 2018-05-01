// @flow
import type { ModelBase, TopLevelEntity } from 'metaed-core';

export function metaEdNameWithExtension(extensionEntity: ModelBase): () => string {
  return () => {
    const projectExtension = extensionEntity.namespace.projectExtension;
    return projectExtension ? `${projectExtension}-${extensionEntity.metaEdName}` : extensionEntity.metaEdName;
  };
}

export function metaEdNameWithExtensionIncludingSuffix(extensionEntity: TopLevelEntity): () => string {
  return () => {
    const baseName = extensionEntity.metaEdName + extensionEntity.namespace.extensionEntitySuffix;
    const projectExtension = extensionEntity.namespace.projectExtension;
    return projectExtension ? `${projectExtension}-${baseName}` : baseName;
  };
}
