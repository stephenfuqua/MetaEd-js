// @flow
import type { DomainEntity } from '../../../../../packages/metaed-core/src/model/DomainEntity';
import type { DomainEntitySubclass } from '../../../../../packages/metaed-core/src/model/DomainEntitySubclass';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
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
