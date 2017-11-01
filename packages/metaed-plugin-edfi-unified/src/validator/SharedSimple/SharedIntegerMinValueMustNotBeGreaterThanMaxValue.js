// @flow
import type { MetaEdEnvironment, ValidationFailure, SharedIntegerSourceMap } from 'metaed-core';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.sharedInteger.forEach(entity => {
    if (entity.minValue && entity.maxValue && Number.parseInt(entity.minValue, 10) > Number.parseInt(entity.maxValue, 10)) {
      failures.push({
        validatorName: 'SharedIntegerMinValueMustNotBeGreaterThanMaxValue',
        category: 'error',
        message: `${entity.typeHumanizedName} ${entity.metaEdName} has min value greater than max value.`,
        sourceMap: ((entity.sourceMap: any): SharedIntegerSourceMap).minValue,
        fileMap: null,
      });
    }
  });

  return failures;
}
