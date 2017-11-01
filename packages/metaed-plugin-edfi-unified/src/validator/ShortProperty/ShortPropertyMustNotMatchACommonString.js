// @flow
import type { MetaEdEnvironment, ValidationFailure } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.short.forEach(short => {
    if (metaEd.entity.sharedString.has(short.metaEdName)) {
      failures.push({
        validatorName: 'ShortPropertyMustNotMatchACommonString',
        category: 'error',
        message: `Short Property ${short.metaEdName} has the same name as a Common String.`,
        sourceMap: short.sourceMap.metaEdName,
        fileMap: null,
      });
    }
  });

  return failures;
}
