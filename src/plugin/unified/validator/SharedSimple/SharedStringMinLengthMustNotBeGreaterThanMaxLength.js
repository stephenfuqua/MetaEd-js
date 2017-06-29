// @flow
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import type { SharedStringSourceMap } from '../../../../core/model/SharedString';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
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
