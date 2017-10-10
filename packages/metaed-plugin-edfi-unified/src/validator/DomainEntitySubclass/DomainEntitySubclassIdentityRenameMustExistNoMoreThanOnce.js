// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { failSubclassIdentityRenamingMoreThanOnce } from '../ValidatorShared/FailSubclassIdentityRenamingMoreThanOnce';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.domainEntitySubclass.forEach(domainEntitySubclass => {
    failSubclassIdentityRenamingMoreThanOnce('DomainEntitySubclassIdenitityRenameMustExistNoMoreThanOnce', domainEntitySubclass, failures);
  });

  return failures;
}
