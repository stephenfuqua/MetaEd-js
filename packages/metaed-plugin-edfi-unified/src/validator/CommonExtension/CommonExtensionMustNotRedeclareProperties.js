// @flow
import type { Common, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
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

