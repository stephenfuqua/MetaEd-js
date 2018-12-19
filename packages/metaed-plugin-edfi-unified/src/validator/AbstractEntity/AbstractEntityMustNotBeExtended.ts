import { getEntityForNamespaces, asDomainEntity } from 'metaed-core';
import { MetaEdEnvironment, ValidationFailure, DomainEntityExtension, TopLevelEntity } from 'metaed-core';

// METAED-805
const validatorName = 'AbstractEntityMustNotBeExtended';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach(namespace => {
    namespace.entity.domainEntityExtension.forEach((extensionEntity: DomainEntityExtension) => {
      const baseEntity: TopLevelEntity | null = getEntityForNamespaces(
        extensionEntity.metaEdName,
        [namespace, ...namespace.dependencies],
        'domainEntity',
      ) as TopLevelEntity | null;

      if (baseEntity == null || !asDomainEntity(baseEntity).isAbstract) return;

      failures.push({
        validatorName,
        category: 'error',
        message: `${baseEntity.typeHumanizedName} ${
          baseEntity.metaEdName
        } additions is not valid.  Abstract entities cannot be extended.`,
        sourceMap: extensionEntity.sourceMap.type,
        fileMap: null,
      });
    });
  });

  return failures;
}
