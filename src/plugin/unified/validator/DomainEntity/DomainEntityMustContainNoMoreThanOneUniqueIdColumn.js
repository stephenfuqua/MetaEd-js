// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import type { EntityProperty } from '../../../../core/model/property/EntityProperty';

const hasDuplicateUniqueIds = (properties: Array<EntityProperty>) =>
  properties.reduce((count, property) => (property.metaEdName === 'UniqueId' ? count + 1 : count), 0) > 1;

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
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
