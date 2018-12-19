import { MetaEdEnvironment, ValidationFailure, Namespace, TopLevelEntity } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
      if (!domainEntitySubclass.identityProperties.some(x => x.isIdentityRename)) return;

      const baseEntity: TopLevelEntity | null = getEntityForNamespaces(
        domainEntitySubclass.baseEntityName,
        [namespace, ...namespace.dependencies],
        'domainEntity',
      ) as TopLevelEntity | null;
      if (baseEntity && baseEntity.identityProperties.length <= 1) return;

      failures.push({
        validatorName: 'DomainEntitySubclassIdentityRenameMustNotExistForMultiPropertyIdentity',
        category: 'error',
        message: `${domainEntitySubclass.typeHumanizedName} ${domainEntitySubclass.metaEdName} based on ${
          domainEntitySubclass.baseEntityName
        } is invalid for identity rename because parent entity ${
          domainEntitySubclass.baseEntityName
        } has more than one identity property.`,
        sourceMap: domainEntitySubclass.sourceMap.type,
        fileMap: null,
      });
    });
  });
  return failures;
}
