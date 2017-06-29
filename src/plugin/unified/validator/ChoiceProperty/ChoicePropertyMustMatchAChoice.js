// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';

export function validate(repository: Repository, propertyRepository: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  propertyRepository.choice.forEach(property => {
    if (repository.entity.choice.get(property.metaEdName) == null) {
      failures.push({
        validatorName: 'ChoicePropertyMustMatchAChoice',
        category: 'error',
        message: `Choice property '${property.metaEdName}' does not match any declared Choice.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
