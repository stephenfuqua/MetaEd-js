// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { failSubclassIdentityRenamingMoreThanOnce } from '../ValidatorShared/FailSubclassIdentityRenamingMoreThanOnce';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    failSubclassIdentityRenamingMoreThanOnce('AssociationSubclassIdentityRenameMustExistNoMoreThanOnce', associationSubclass, failures);
  });

  return failures;
}
