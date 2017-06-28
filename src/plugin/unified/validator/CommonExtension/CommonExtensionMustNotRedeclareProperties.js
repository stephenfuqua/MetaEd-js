// @flow
import type { Common } from '../../../../core/model/Common';
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyIndex } from '../../../../core/model/property/PropertyIndex';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyIndex?: PropertyIndex): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.commonExtension.forEach(commonExtension => {
    const extendedEntity : Common | void = repository.entity.common.get(commonExtension.metaEdName);
    if (extendedEntity) {
      failExtensionPropertyRedeclarations('CommonExtensionMustNotRedeclareProperties', commonExtension, extendedEntity, failures);
    }
  });
  return failures;
}

