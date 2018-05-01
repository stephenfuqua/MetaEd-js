// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.commonExtension.forEach(entity => {
    if (!entity.namespace.isExtension) {
      failures.push({
        validatorName: 'CommonExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `Common additions '${entity.metaEdName}' is not valid in core namespace '${entity.namespace.namespaceName}`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
