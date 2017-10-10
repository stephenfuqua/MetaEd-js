// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import type { SharedDecimalSourceMap } from '../../../../metaed-core/src/model/SharedDecimal';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.sharedDecimal.forEach(entity => {
    if (entity.minValue && entity.maxValue && Number.parseInt(entity.minValue, 10) > Number.parseInt(entity.maxValue, 10)) {
      failures.push({
        validatorName: 'SharedDecimalMinValueMustNotBeGreaterThanMaxValue',
        category: 'error',
        message: `${entity.typeHumanizedName} ${entity.metaEdName} has min value greater than max value.`,
        sourceMap: ((entity.sourceMap: any): SharedDecimalSourceMap).minValue,
        fileMap: null,
      });
    }
  });

  return failures;
}
