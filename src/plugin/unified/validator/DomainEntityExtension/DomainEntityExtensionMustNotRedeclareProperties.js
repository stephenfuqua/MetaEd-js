// @flow
import type { DomainEntity } from '../../../../core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../core/model/DomainEntitySubclass';
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.domainEntityExtension.forEach(domainEntityExtension => {
    const extendedEntity : DomainEntity | DomainEntitySubclass | void =
      repository.entity.domainEntity.get(domainEntityExtension.metaEdName) || repository.entity.domainEntitySubclass.get(domainEntityExtension.metaEdName);
    if (extendedEntity) {
      failExtensionPropertyRedeclarations('DomainEntityExtensionMustNotRedeclareProperties', domainEntityExtension, extendedEntity, failures);
    }
  });
  return failures;
}
