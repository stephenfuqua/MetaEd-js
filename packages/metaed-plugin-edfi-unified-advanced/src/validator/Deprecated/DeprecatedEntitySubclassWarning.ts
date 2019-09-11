import { MetaEdEnvironment, getAllEntitiesOfType, ValidationFailure, ModelBase, TopLevelEntity } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): ValidationFailure[] {
  const failures: ValidationFailure[] = [];

  getAllEntitiesOfType(metaEd, 'associationSubclass', 'domainEntitySubclass').forEach((entity: ModelBase) => {
    const { baseEntity } = entity as TopLevelEntity;
    if (baseEntity !== null && baseEntity.isDeprecated) {
      failures.push({
        validatorName: 'DeprecatedEntitySubclassWarning',
        category: 'warning',
        message: `${entity.metaEdName} is a subclass of deprecated entity ${baseEntity.metaEdName}.`,
        sourceMap: (entity as TopLevelEntity).sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
