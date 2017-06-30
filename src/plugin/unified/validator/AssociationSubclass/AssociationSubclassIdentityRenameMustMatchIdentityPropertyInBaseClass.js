// @flow
import type { Association } from '../../../../core/model/Association';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty } from '../ValidatorShared/FailSubclassIdentityRenameNotMatchingBaseClassIdentityProperty';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    const extendedEntity : Association | void = metaEd.entity.association.get(associationSubclass.baseEntityName);
    failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty(
      'AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass', associationSubclass, extendedEntity, failures);
  });

  return failures;
}
