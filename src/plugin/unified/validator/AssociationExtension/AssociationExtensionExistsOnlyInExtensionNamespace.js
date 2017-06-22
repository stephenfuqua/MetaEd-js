// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.associationExtension.forEach(entity => {
    if (!entity.namespaceInfo.isExtension) {
      failures.push({
        validatorName: 'AssociationExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `Association additions '${entity.metaEdName}' is not valid in core namespace '${entity.namespaceInfo.namespace}`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
