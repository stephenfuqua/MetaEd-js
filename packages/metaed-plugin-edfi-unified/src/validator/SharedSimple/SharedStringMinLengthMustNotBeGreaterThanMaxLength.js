// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import type { SharedStringSourceMap } from '../../../../../packages/metaed-core/src/model/SharedString';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.sharedString.forEach(entity => {
    if (entity.minLength && entity.maxLength && Number.parseInt(entity.minLength, 10) > Number.parseInt(entity.maxLength, 10)) {
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
