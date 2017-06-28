// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import type { SharedStringSourceMap } from '../../../../core/model/SharedString';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.sharedString.forEach(entity => {
    if (Number.parseInt(entity.minLength, 10) > Number.parseInt(entity.maxLength, 10)) {
      failures.push({
        validatorName: 'SharedStringMinLengthMustNotBeGreaterThanMaxLength',
        category: 'error',
        message: `${entity.typeHumanizedName} ${entity.metaEdName} has min length greater than max length.`,
        sourceMap: ((entity.sourceMap: any): SharedStringSourceMap).minLength,
        fileMap: null,
      });
    }
  });

  return failures;
}
