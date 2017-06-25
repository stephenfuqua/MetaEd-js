// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntityExtension.forEach(entity => {
    if (!entity.namespaceInfo.isExtension) {
      failures.push({
        validatorName: 'DomainEntityExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `DomainEntity additions '${entity.metaEdName}' is not valid in core namespace '${entity.namespaceInfo.namespace}`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}

