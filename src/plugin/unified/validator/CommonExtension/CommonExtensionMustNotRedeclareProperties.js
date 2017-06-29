// @flow
import type { Common } from '../../../../core/model/Common';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.commonExtension.forEach(commonExtension => {
    const extendedEntity : Common | void = metaEd.entity.common.get(commonExtension.metaEdName);
    if (extendedEntity) {
      failExtensionPropertyRedeclarations('CommonExtensionMustNotRedeclareProperties', commonExtension, extendedEntity, failures);
    }
  });
  return failures;
}

