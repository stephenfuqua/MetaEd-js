import { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.associationSubclass.forEach(entity => {
      if (getEntityForNamespaces(entity.baseEntityName, [namespace, ...namespace.dependencies], 'association') == null) {
        failures.push({
          validatorName: 'AssociationSubclassIdentifierMustMatchAnAssociation',
          category: 'error',
          message: `Association ${entity.metaEdName} based on ${
            entity.baseEntityName
          } does not match any declared Association.`,
          sourceMap: entity.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });
  return failures;
}
