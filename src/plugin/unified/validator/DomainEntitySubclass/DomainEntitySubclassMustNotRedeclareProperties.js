// @flow
import type { DomainEntity } from '../../../../core/model/DomainEntity';
import type { DomainEntityExtension } from '../../../../core/model/DomainEntityExtension';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
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
