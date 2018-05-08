// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    namespace.entity.domainEntityExtension.forEach(domainEntityExtension => {
      const extendedEntity: ?ModelBase = getEntityForNamespaces(
        domainEntityExtension.metaEdName,
        namespace.dependencies,
        'domainEntity',
        'domainEntitySubclass',
      );

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
