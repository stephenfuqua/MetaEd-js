// @flow
import type { TopLevelEntity } from '../../../../../packages/metaed-core/src/model/TopLevelEntity';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { EntityProperty } from '../../../../../packages/metaed-core/src/model/property/EntityProperty';

export function failSubclassIdentityRenamingMoreThanOnce(
  validatorName: string,
  subclassEntity: TopLevelEntity,
  failures: Array<ValidationFailure>) {
  const identityRenames: Array<EntityProperty> = subclassEntity.properties.filter(x => x.isIdentityRename === true);
  if (identityRenames.length <= 1) return;

  const baseKeyNames: string = identityRenames.map(x => x.baseKeyName).join(', ');
  identityRenames.forEach(identityRename => {
    failures.push({
      validatorName,
      category: 'error',
      message: `${subclassEntity.typeHumanizedName} ${subclassEntity.metaEdName} based on ${subclassEntity.baseEntityName} tries to rename properties ${baseKeyNames}. Only one identity rename is allowed for a given ${subclassEntity.typeHumanizedName}.`,
      sourceMap: identityRename.sourceMap.baseKeyName,
      fileMap: null,
    });
  });
}
