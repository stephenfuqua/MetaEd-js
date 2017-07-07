// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    if (!metaEd.entity.association.has(associationSubclass.baseEntityName)) {
      failures.push({
        validatorName: 'AssociationSubclassIdentifierMustMatchAnAssociation',
        category: 'error',
        message: `Association ${associationSubclass.metaEdName} based on ${associationSubclass.baseEntityName} does not match any declared Association.`,
        sourceMap: associationSubclass.sourceMap.type,
        fileMap: null,
      });
    }
  });
  return failures;
}
