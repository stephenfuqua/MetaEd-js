// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.commonExtension.forEach(entity => {
    if (!repository.entity.common.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'CommonExtensionIdentifierMustMatchACommon',
        category: 'error',
        message: `Common additions '${entity.metaEdName}' does not match any declared Common.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
