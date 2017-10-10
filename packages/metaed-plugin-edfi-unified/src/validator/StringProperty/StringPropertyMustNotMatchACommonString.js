// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.string.forEach(string => {
    if (metaEd.entity.sharedString.has(string.metaEdName)) {
      failures.push({
        validatorName: 'StringPropertyMustNotMatchACommonString',
        category: 'error',
        message: `String Property ${string.metaEdName} has the same name as a Common String.`,
        sourceMap: string.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
