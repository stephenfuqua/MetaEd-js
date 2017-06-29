// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.associationExtension.forEach(entity => {
    if (!repository.entity.association.has(entity.metaEdName) && !repository.entity.associationSubclass.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass',
        category: 'error',
        message: `Association additions '${entity.metaEdName}' does not match any declared Association or Association Subclass.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
