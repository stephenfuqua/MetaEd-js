// @flow
import type { MetaEdEnvironment, ValidationFailure, TopLevelEntity } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    namespace.entity.associationExtension.forEach(associationExtension => {
      const extendedEntity: ?TopLevelEntity = ((getEntityForNamespaces(
        associationExtension.metaEdName,
        namespace.dependencies,
        'association',
        'associationSubclass',
      ): any): ?TopLevelEntity);

      if (extendedEntity != null) {
        failExtensionPropertyRedeclarations(
          'AssociationExtensionMustNotRedeclareProperties',
          associationExtension,
          extendedEntity,
          failures,
        );
      }
    });
  });
  return failures;
}
