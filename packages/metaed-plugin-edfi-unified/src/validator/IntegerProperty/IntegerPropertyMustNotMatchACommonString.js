// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.integer.forEach(integer => {
    metaEd.entity.sharedString.forEach(sharedString => {
      if (integer.metaEdName !== sharedString.metaEdName) return;
      failures.push({
        validatorName: 'IntegerPropertyMustNotMatchACommonString',
        category: 'error',
        message: `${integer.type} ${integer.metaEdName} has the same name as a Common String.`,
        sourceMap: integer.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
