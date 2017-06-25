// @flow
import type { Common } from '../../../../../packages/metaed-core/src/model/Common';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
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

