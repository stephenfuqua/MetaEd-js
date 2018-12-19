import { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.associationExtension.forEach(entity => {
      if (getEntityForNamespaces(entity.metaEdName, namespace.dependencies, 'association', 'associationSubclass') == null) {
        failures.push({
          validatorName: 'AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass',
          category: 'error',
          message: `Association additions '${
            entity.metaEdName
          }' does not match any declared Association or Association Subclass.`,
          sourceMap: entity.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
