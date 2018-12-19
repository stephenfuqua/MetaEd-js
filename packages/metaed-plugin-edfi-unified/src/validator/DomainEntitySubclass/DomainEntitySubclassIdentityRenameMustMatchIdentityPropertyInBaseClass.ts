import { DomainEntity, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty } from '../ValidatorShared/FailSubclassIdentityRenameNotMatchingBaseClassIdentityProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
      const extendedEntity: DomainEntity | null = getEntityForNamespaces(
        domainEntitySubclass.baseEntityName,
        [namespace, ...namespace.dependencies],
        'domainEntity',
      ) as DomainEntity | null;

      failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty(
        'DomainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass',
        domainEntitySubclass,
        extendedEntity,
        failures,
      );
    });
  });
  return failures;
}
