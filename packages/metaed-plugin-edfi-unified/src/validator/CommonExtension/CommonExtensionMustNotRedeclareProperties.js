// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    namespace.entity.commonExtension.forEach(commonExtension => {
      const extendedEntity: ?ModelBase = getEntityForNamespaces(
        commonExtension.metaEdName,
        namespace.dependencies,
        'common',
      );

      if (extendedEntity) {
        failExtensionPropertyRedeclarations(
          'CommonExtensionMustNotRedeclareProperties',
          commonExtension,
          extendedEntity,
          failures,
        );
      }
    });
  });
  return failures;
}
