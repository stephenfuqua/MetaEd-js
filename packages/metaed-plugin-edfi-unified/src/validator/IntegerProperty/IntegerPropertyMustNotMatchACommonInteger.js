// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.integer.forEach(integer => {
    metaEd.entity.sharedInteger.forEach(sharedInteger => {
      if (integer.metaEdName !== sharedInteger.metaEdName) return;
      failures.push({
        validatorName: 'IntegerPropertyMustNotMatchACommonInteger',
        category: 'error',
        message: `${integer.type} ${integer.metaEdName} has the same name as a Common Integer.`,
        sourceMap: integer.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
