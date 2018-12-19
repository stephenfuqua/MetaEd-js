import { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.commonExtension.forEach(entity => {
      if (getEntityForNamespaces(entity.metaEdName, namespace.dependencies, 'common') == null) {
        failures.push({
          validatorName: 'CommonExtensionIdentifierMustMatchACommon',
          category: 'error',
          message: `Common additions '${entity.metaEdName}' does not match any declared Common.`,
          sourceMap: entity.sourceMap.type,
          fileMap: null,
        });
      }
    });
  });

  return failures;
}
