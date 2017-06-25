// @flow
import type { DomainEntity } from '../../../../../packages/metaed-core/src/model/DomainEntity';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
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
