// @flow
import type { MetaEdEnvironment, ValidationFailure, ModelBase } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failInterchangeExtensionPropertyRedeclarations } from '../ValidatorShared/FailInterchangeExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.interchangeExtension.forEach(interchangeExtension => {
      const extendedEntity: ?ModelBase = getEntityForNamespaces(
        interchangeExtension.metaEdName,
        [...namespace.dependencies],
        'interchange',
      );
      if (extendedEntity == null) return;

      failInterchangeExtensionPropertyRedeclarations(
        'InterchangeExtensionMustNotRedeclareBaseInterchangeElements',
        'elements',
        interchangeExtension,
        extendedEntity,
        failures,
      );
    });
  });
  return failures;
}
