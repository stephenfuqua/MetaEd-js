// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import type { SharedDecimalSourceMap } from '../../../../core/model/SharedDecimal';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.sharedDecimal.forEach(entity => {
    if (Number.parseInt(entity.minValue, 10) > Number.parseInt(entity.maxValue, 10)) {
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
