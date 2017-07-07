// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    if (metaEd.entity.sharedInteger.has(decimal.metaEdName)) {
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchACommonInteger',
        category: 'error',
        message: `Decimal Property ${decimal.metaEdName} has the same name as a Common Integer.`,
        sourceMap: decimal.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
