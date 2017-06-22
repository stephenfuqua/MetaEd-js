// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import type { EntityProperty } from '../../../../core/model/property/EntityProperty';

export function validate(repository: Repository, propertyIndex: PropertyIndex): Array<ValidationFailure> {
  const properties: ?Array<EntityProperty> = propertyIndex.get('choice');
  if (properties == null) return [];

  const failures: Array<ValidationFailure> = [];
  properties.forEach(property => {
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
