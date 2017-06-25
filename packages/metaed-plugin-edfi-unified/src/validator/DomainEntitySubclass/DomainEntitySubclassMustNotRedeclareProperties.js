// @flow
import type { DomainEntity } from '../../../../../packages/metaed-core/src/model/DomainEntity';
import type { DomainEntityExtension } from '../../../../../packages/metaed-core/src/model/DomainEntityExtension';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    const extendedEntity: DomainEntity | DomainEntityExtension | void =
      metaEd.entity.domainEntity.get(domainEntitySubclass.baseEntityName) || metaEd.entity.domainEntityExtension.get(domainEntitySubclass.baseEntityName);
    if (!extendedEntity) return;
    failExtensionPropertyRedeclarations('DomainEntitySubClassMustNotRedeclareProperties', domainEntitySubclass, extendedEntity, failures);
  });

  return failures;
}
