import { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach(namespace => {
    if (namespace.isExtension) return;
    namespace.entity.associationExtension.forEach(entity => {
      failures.push({
        validatorName: 'AssociationExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `Association additions '${entity.metaEdName}' is not valid in core namespace '${
          entity.namespace.namespaceName
        }`,
        sourceMap: entity.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
