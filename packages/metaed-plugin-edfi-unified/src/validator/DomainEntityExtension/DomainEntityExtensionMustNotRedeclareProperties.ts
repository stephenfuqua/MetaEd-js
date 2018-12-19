import { MetaEdEnvironment, ValidationFailure, TopLevelEntity } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    namespace.entity.domainEntityExtension.forEach(domainEntityExtension => {
      const extendedEntity: TopLevelEntity | null = getEntityForNamespaces(
        domainEntityExtension.metaEdName,
        namespace.dependencies,
        'domainEntity',
        'domainEntitySubclass',
      ) as TopLevelEntity | null;

      if (extendedEntity != null) {
        failExtensionPropertyRedeclarations(
          'DomainEntityExtensionMustNotRedeclareProperties',
          domainEntityExtension,
          extendedEntity,
          failures,
        );
      }
    });
  });
  return failures;
}
