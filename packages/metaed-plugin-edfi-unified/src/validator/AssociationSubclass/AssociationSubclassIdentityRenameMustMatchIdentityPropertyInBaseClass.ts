import { Association, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failSubclassIdentityRenameNotMatchingBaseClassIdentityProperty } from '../ValidatorShared/FailSubclassIdentityRenameNotMatchingBaseClassIdentityProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.associationSubclass.forEach(associationSubclass => {
      const extendedEntity: Association | null = getEntityForNamespaces(
        associationSubclass.baseEntityName,
        [namespace, ...namespace.dependencies],
        'association',
      ) as Association | null;

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
