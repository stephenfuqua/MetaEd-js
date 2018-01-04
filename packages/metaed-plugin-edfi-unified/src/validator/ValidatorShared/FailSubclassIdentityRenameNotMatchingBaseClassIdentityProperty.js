// @flow
import type { TopLevelEntity, EntityProperty, ValidationFailure } from 'metaed-core';

export function failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty(
  validatorName: string,
  subclassEntity: TopLevelEntity,
  baseEntity: TopLevelEntity | void,
  failures: Array<ValidationFailure>,
) {
  const identityRenames: Array<EntityProperty> = subclassEntity.properties.filter(x => x.isIdentityRename);

  identityRenames.forEach(renamedProperty => {
    if (baseEntity && baseEntity.identityProperties.some(x => x.metaEdName === renamedProperty.baseKeyName)) return;

    const baseKeyNames: string = identityRenames.map(x => x.baseKeyName).join(', ');
    failures.push({
      validatorName,
      category: 'error',
      message: `${subclassEntity.typeHumanizedName} ${subclassEntity.metaEdName} based on ${
        subclassEntity.baseEntityName
      } tries to rename ${baseKeyNames} which is not part of the identity.`,
      sourceMap: renamedProperty.sourceMap.baseKeyName,
      fileMap: null,
    });
  });
}
