// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';

export function validate(repository: Repository, propertyRepository: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  propertyRepository.association.forEach(property => {
    if (!repository.entity.association.has(property.metaEdName) && !repository.entity.associationSubclass.has(property.metaEdName)) {
      failures.push({
        validatorName: 'AssociationPropertyMustMatchAnAssociation',
        category: 'error',
        message: `Association property '${property.metaEdName}' does not match any declared Association or Association Subclass.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
