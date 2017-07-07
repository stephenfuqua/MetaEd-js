// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.decimal.forEach(decimal => {
    metaEd.entity.sharedInteger.forEach(sharedInteger => {
      if (decimal.metaEdName !== sharedInteger.metaEdName) return;
      failures.push({
        validatorName: 'DecimalPropertyMustNotMatchACommonInteger',
        category: 'error',
        message: `${decimal.type} ${decimal.metaEdName} has the same name as a Common Integer.`,
        sourceMap: decimal.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
  return failures;
}
