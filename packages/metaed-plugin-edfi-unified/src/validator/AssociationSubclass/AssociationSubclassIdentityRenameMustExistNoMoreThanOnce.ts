import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { failSubclassIdentityRenamingMoreThanOnce } from '../ValidatorShared/FailSubclassIdentityRenamingMoreThanOnce';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach(namespace => {
    namespace.entity.associationSubclass.forEach(associationSubclass => {
      failSubclassIdentityRenamingMoreThanOnce(
        'AssociationSubclassIdentityRenameMustExistNoMoreThanOnce',
        associationSubclass,
        failures,
      );
    });
  });

  return failures;
}
