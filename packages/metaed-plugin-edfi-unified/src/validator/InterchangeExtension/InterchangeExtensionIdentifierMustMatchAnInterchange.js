// @flow
import type { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.interchangeExtension.forEach(interchangeExtension => {
      if (getEntityForNamespaces(interchangeExtension.metaEdName, [...namespace.dependencies], 'interchange') == null) {
        failures.push({
          validatorName: 'InterchangeExtensionIdentifierMustMatchAnInterchange',
          category: 'error',
          message: `Interchange additions ${interchangeExtension.metaEdName} does not match any declared Interchange.`,
          sourceMap: interchangeExtension.sourceMap.metaEdName,
          fileMap: null,
        });
      }
    });
  });
  return failures;
}
