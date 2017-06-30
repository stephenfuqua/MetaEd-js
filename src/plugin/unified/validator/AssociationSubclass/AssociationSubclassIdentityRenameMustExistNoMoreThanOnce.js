// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failSubclassIdentityRenamingMoreThanOnce } from '../ValidatorShared/FailSubclassIdentityRenamingMoreThanOnce';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    failSubclassIdentityRenamingMoreThanOnce('AssociationSubclassIdentityRenameMustExistNoMoreThanOnce', associationSubclass, failures);
  });

  return failures;
}
