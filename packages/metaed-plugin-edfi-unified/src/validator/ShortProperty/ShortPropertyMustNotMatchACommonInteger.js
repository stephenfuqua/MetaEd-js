// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.short.forEach(short => {
    if (metaEd.entity.sharedInteger.has(short.metaEdName)) {
      failures.push({
        validatorName: 'ShortPropertyMustNotMatchACommonInteger',
        category: 'error',
        message: `Short Property ${short.metaEdName} has the same name as a Common Integer.`,
        sourceMap: short.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
