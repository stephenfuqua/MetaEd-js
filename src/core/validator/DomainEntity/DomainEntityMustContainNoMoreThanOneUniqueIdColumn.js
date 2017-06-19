// @flow
import type { Repository } from '../../model/Repository';
import type { ValidationFailure } from '../ValidationFailure';
import type { PropertyType } from '../../model/property/PropertyType';
import type { EntityProperty } from '../../model/property/EntityProperty';

const hasDuplicateUniqueIds = (properties: Array<EntityProperty>) =>
  properties.reduce((count, property) => (property.metaEdName === 'UniqueId' ? count + 1 : count), 0) > 1;

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex: Map<PropertyType, Array<EntityProperty>>): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domainEntity.forEach(domainEntity => {
    if (!domainEntity.namespaceInfo.isExtension && hasDuplicateUniqueIds(domainEntity.properties)) {
      failures.push({
        validatorName: 'DomainEntityMustContainNoMoreThanOneUniqueIdColumn',
        category: 'error',
        message: `Domain Entity ${domainEntity.metaEdName} has multiple properties with a property name of 'UniqueId'.  Only one column in a core domain entity can be named 'UniqueId'.`,
        sourceMap: domainEntity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
