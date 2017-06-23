// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domainEntityExtension.forEach(entity => {
    if (!repository.entity.domainEntity.has(entity.metaEdName) && !repository.entity.domainEntitySubclass.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'DomainEntityExtensionIdentifierMustMatchAnDomainEntityOrDomainEntitySubclass',
        category: 'error',
        message: `Domain Entity additions '${entity.metaEdName}' does not match any declared Domain Entity or Domain Entity Subclass.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}

