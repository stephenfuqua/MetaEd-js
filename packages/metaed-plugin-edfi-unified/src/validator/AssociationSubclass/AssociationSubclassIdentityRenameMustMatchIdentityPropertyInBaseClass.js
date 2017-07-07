// @flow
import type { Association, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty } from '../ValidatorShared/FailSubclassIdentityRenameNotMatchingBaseClassIdentityProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    const extendedEntity : Association | void = metaEd.entity.association.get(associationSubclass.baseEntityName);
    failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty(
      'AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass', associationSubclass, extendedEntity, failures);
  });

  return failures;
}
