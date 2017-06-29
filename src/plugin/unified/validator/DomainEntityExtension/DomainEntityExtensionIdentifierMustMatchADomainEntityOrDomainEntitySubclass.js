// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domainEntityExtension.forEach(entity => {
    if (!repository.entity.domainEntity.has(entity.metaEdName) && !repository.entity.domainEntitySubclass.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'DomainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass',
        category: 'error',
        message: `Domain Entity additions '${entity.metaEdName}' does not match any declared Domain Entity or Domain Entity Subclass.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}

