// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    metaEd.entity.sharedString.forEach(sharedString => {
      if (decimal.metaEdName !== sharedString.metaEdName) return;
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchACommonString',
        category: 'error',
        message: `${decimal.type} ${decimal.metaEdName} has the same name as a Common String.`,
        sourceMap: decimal.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
