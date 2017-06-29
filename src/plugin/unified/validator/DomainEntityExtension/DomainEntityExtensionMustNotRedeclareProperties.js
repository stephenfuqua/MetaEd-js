// @flow
import type { DomainEntity } from '../../../../core/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../core/model/DomainEntitySubclass';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntityExtension.forEach(domainEntityExtension => {
    const extendedEntity : DomainEntity | DomainEntitySubclass | void =
      metaEd.entity.domainEntity.get(domainEntityExtension.metaEdName) || metaEd.entity.domainEntitySubclass.get(domainEntityExtension.metaEdName);
    if (extendedEntity) {
      failExtensionPropertyRedeclarations('DomainEntityExtensionMustNotRedeclareProperties', domainEntityExtension, extendedEntity, failures);
    }
  });
  return failures;
}
