// @flow
import type { MetaEdEnvironment, ValidationFailure, CommonExtension } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    namespace.entity.commonExtension.forEach(commonExtension => {
      const extendedEntity: ?CommonExtension = ((getEntityForNamespaces(
        commonExtension.metaEdName,
        namespace.dependencies,
        'common',
      ): any): ?CommonExtension);

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
