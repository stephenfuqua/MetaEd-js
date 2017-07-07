// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.integer.forEach(integer => {
    metaEd.entity.sharedDecimal.forEach(sharedDecimal => {
      if (integer.metaEdName !== sharedDecimal.metaEdName) return;
      failures.push({
        validatorName: 'IntegerPropertyMustNotMatchACommonDecimal',
        category: 'error',
        message: `${integer.type} ${integer.metaEdName} has the same name as a Common Decimal.`,
        sourceMap: integer.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
