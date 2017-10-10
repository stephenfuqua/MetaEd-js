// @flow
import type { DomainEntity, DomainEntityExtension, MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
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
