// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { SharedDecimalSourceMap } from '../../../../../packages/metaed-core/src/model/SharedDecimal';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.sharedDecimal.forEach(entity => {
    if (entity.decimalPlaces && entity.totalDigits && Number.parseInt(entity.decimalPlaces, 10) > Number.parseInt(entity.totalDigits, 10)) {
      failures.push({
        validatorName: 'SharedDecimalDecimalPlacesMustNotBeGreaterThanTotalDigits',
        category: 'error',
        message: `${entity.typeHumanizedName} ${entity.metaEdName} has decimal places greater than total digits.`,
        sourceMap: ((entity.sourceMap: any): SharedDecimalSourceMap).decimalPlaces,
        fileMap: null,
      });
    }
  });

  return failures;
}
