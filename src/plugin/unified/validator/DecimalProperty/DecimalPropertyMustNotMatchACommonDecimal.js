// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    metaEd.entity.sharedDecimal.forEach(sharedDecimal => {
      if (decimal.metaEdName !== sharedDecimal.metaEdName) return;
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchACommonDecimal',
        category: 'error',
        message: `${decimal.type} ${decimal.metaEdName} has the same name as a Common Decimal.`,
        sourceMap: decimal.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
