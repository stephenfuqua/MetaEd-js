import { DomainEntity, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
      const extendedEntity: DomainEntity | null = getEntityForNamespaces(
        domainEntitySubclass.baseEntityName,
        [namespace, ...namespace.dependencies],
        'domainEntity',
      ) as DomainEntity | null;

      if (extendedEntity == null) return;
      failExtensionPropertyRedeclarations(
        'DomainEntitySubClassMustNotRedeclareProperties',
        domainEntitySubclass,
        extendedEntity,
        failures,
      );
    });
  });

  return failures;
}
