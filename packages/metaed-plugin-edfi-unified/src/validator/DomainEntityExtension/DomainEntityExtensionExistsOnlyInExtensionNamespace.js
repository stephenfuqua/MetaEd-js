// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    if (namespace.isExtension) return;
    namespace.entity.domainEntityExtension.forEach(entity => {
      failures.push({
        validatorName: 'DomainEntityExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `DomainEntity additions '${entity.metaEdName}' is not valid in core namespace '${
          entity.namespace.namespaceName
        }`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    });
  });
  return failures;
}
