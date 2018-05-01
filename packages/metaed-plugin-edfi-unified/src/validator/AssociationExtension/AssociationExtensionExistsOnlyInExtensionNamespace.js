// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.associationExtension.forEach(entity => {
    if (!entity.namespace.isExtension) {
      failures.push({
        validatorName: 'AssociationExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `Association additions '${entity.metaEdName}' is not valid in core namespace '${
          entity.namespace.namespaceName
        }`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
