// @flow
import type { DomainEntity } from '../../../../core/model/DomainEntity';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty } from '../ValidatorShared/FailSubclassIdentityRenameNotMatchingBaseClassIdentityProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    const extendedEntity : DomainEntity | void = metaEd.entity.domainEntity.get(domainEntitySubclass.baseEntityName);
    failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty(
      'DomainEntitySubclassIdentityRenameMustMatchIdentityPropertyInBaseClass', domainEntitySubclass, extendedEntity, failures);
  });

  return failures;
}
