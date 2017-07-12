// @flow
import type { TopLevelEntity } from '../../../../../packages/metaed-core/index';

export function metaEdNameWithExtension(extensionEntity: TopLevelEntity): string {
  const baseName = extensionEntity.metaEdName + extensionEntity.namespaceInfo.extensionEntitySuffix;
  const projectExtension = extensionEntity.namespaceInfo.projectExtension;
  return projectExtension ? `${projectExtension}-${baseName}` : baseName;
}
