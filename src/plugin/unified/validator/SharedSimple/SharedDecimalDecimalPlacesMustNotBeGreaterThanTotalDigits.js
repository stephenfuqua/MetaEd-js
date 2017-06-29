// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import type { SharedDecimalSourceMap } from '../../../../core/model/SharedDecimal';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.sharedDecimal.forEach(entity => {
    if (Number.parseInt(entity.decimalPlaces, 10) > Number.parseInt(entity.totalDigits, 10)) {
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
