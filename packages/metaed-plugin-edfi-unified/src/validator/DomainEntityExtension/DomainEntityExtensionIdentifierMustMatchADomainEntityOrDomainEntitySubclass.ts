import { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.domainEntityExtension.forEach(entity => {
      if (
        getEntityForNamespaces(entity.metaEdName, namespace.dependencies, 'domainEntity', 'domainEntitySubclass') == null
      ) {
        failures.push({
          validatorName: 'DomainEntityExtensionIdentifierMustMatchADomainEntityOrDomainEntitySubclass',
          category: 'error',
          message: `Domain Entity additions '${
            entity.metaEdName
          }' does not match any declared Domain Entity or Domain Entity Subclass.`,
          sourceMap: entity.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
