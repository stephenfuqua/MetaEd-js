// @flow
import type { ModelBase, TopLevelEntity } from '../../../../metaed-core/index';

export function metaEdNameWithExtension(extensionEntity: ModelBase): () => string {
  return () => {
    const projectExtension = extensionEntity.namespaceInfo.projectExtension;
    return projectExtension ? `${projectExtension}-${extensionEntity.metaEdName}` : extensionEntity.metaEdName;
  };
}

export function metaEdNameWithExtensionIncludingSuffix(extensionEntity: TopLevelEntity): () => string {
  return () => {
    const baseName = extensionEntity.metaEdName + extensionEntity.namespaceInfo.extensionEntitySuffix;
    const projectExtension = extensionEntity.namespaceInfo.projectExtension;
    return projectExtension ? `${projectExtension}-${baseName}` : baseName;
  };
}
