// @flow
import type { Repository } from '../../model/Repository';
import type { ValidationFailure } from '../ValidationFailure';
import type { PropertyType } from '../../model/property/PropertyType';
import type { EntityProperty } from '../../model/property/EntityProperty';

export function validate(repository: Repository, propertyIndex: Map<PropertyType, Array<EntityProperty>>): Array<ValidationFailure> {
  const commonProperties: ?Array<EntityProperty> = propertyIndex.get('common');
  if (commonProperties == null) return [];

  const failures: Array<ValidationFailure> = [];
  commonProperties.forEach(property => {
    if (repository.entity.common.get(property.metaEdName) == null) {
      failures.push({
        validatorName: 'CommonPropertyMustMatchACommon',
        category: 'error',
        message: `Common property '${property.metaEdName}' does not match any declared Common.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
