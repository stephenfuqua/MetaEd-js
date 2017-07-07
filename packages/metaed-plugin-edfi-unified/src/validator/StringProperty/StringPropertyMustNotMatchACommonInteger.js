// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.string.forEach(string => {
    if (metaEd.entity.sharedInteger.has(string.metaEdName)) {
      failures.push({
        validatorName: 'StringPropertyMustNotMatchACommonInteger',
        category: 'error',
        message: `String Property ${string.metaEdName} has the same name as a Common Integer.`,
        sourceMap: string.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
