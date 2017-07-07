// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    if (metaEd.entity.sharedString.has(decimal.metaEdName)) {
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchACommonString',
        category: 'error',
        message: `Decimal Property ${decimal.metaEdName} has the same name as a Common String.`,
        sourceMap: decimal.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
