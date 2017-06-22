// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyType } from '../../../../core/model/property/PropertyType';
import type { EntityProperty } from '../../../../core/model/property/EntityProperty';

export function validate(repository: Repository, propertyIndex: Map<PropertyType, Array<EntityProperty>>): Array<ValidationFailure> {
  const properties: ?Array<EntityProperty> = propertyIndex.get('association');
  if (properties == null) return [];

  const failures: Array<ValidationFailure> = [];
  properties.forEach(property => {
    if (repository.entity.association.get(property.metaEdName) == null) {
      failures.push({
        validatorName: 'AssociationPropertyMustMatchAnAssociation',
        category: 'error',
        message: `Association property '${property.metaEdName}' does not match any declared Association.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
