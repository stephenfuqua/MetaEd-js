// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.short.forEach(short => {
    if (metaEd.entity.sharedDecimal.has(short.metaEdName)) {
      failures.push({
        validatorName: 'ShortPropertyMustNotMatchACommonDecimal',
        category: 'error',
        message: `Short Property ${short.metaEdName} has the same name as a Common Decimal.`,
        sourceMap: short.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
