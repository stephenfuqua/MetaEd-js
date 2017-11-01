// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.associationExtension.forEach(entity => {
    if (!metaEd.entity.association.has(entity.metaEdName) && !metaEd.entity.associationSubclass.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'AssociationExtensionIdentifierMustMatchAnAssociationOrAssociationSubclass',
        category: 'error',
        message: `Association additions '${entity.metaEdName}' does not match any declared Association or Association Subclass.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
