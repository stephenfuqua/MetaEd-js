// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import type { SharedIntegerSourceMap } from '../../../../core/model/SharedInteger';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.sharedInteger.forEach(entity => {
    if (Number.parseInt(entity.minValue, 10) > Number.parseInt(entity.maxValue, 10)) {
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
