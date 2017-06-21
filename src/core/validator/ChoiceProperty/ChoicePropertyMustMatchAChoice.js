// @flow
import type { Repository } from '../../model/Repository';
import type { ValidationFailure } from '../ValidationFailure';
import type { PropertyType } from '../../model/property/PropertyType';
import type { EntityProperty } from '../../model/property/EntityProperty';

export function validate(repository: Repository, propertyIndex: Map<PropertyType, Array<EntityProperty>>): Array<ValidationFailure> {
  const choiceProperties: ?Array<EntityProperty> = propertyIndex.get('choice');
  if (choiceProperties == null) return [];

  const failures: Array<ValidationFailure> = [];
  choiceProperties.forEach(property => {
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
