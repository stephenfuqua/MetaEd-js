// @flow
import type { Association, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty } from '../ValidatorShared/FailSubclassIdentityRenameNotMatchingBaseClassIdentityProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.associationSubclass.forEach(associationSubclass => {
      const extendedEntity: ?Association = ((getEntityForNamespaces(
        associationSubclass.baseEntityName,
        [namespace, ...namespace.dependencies],
        'association',
      ): any): ?Association);

      failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty(
        'AssociationSubclassIdentityRenameMustMatchIdentityPropertyInBaseClass',
        associationSubclass,
        extendedEntity,
        failures,
      );
    });
  });
  return failures;
}
