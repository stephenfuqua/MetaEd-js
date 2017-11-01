// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    if (metaEd.entity.sharedDecimal.has(decimal.metaEdName)) {
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchACommonDecimal',
        category: 'error',
        message: `Decimal Property ${decimal.metaEdName} has the same name as a Common Decimal.`,
        sourceMap: decimal.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
