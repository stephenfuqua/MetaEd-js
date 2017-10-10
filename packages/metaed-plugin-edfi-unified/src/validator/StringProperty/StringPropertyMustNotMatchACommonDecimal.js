// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.string.forEach(string => {
    if (metaEd.entity.sharedDecimal.has(string.metaEdName)) {
      failures.push({
        validatorName: 'StringPropertyMustNotMatchACommonDecimal',
        category: 'error',
        message: `String Property ${string.metaEdName} has the same name as a Common Decimal.`,
        sourceMap: string.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
