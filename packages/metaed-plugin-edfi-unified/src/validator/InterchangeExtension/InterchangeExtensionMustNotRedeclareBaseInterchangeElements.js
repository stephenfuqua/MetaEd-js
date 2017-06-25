// @flow
import type { Interchange } from '../../../../../packages/metaed-core/src/model/Interchange';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failInterchangeExtensionPropertyRedeclarations } from '../ValidatorShared/FailInterchangeExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchangeExtension.forEach(interchangeExtension => {
    const extendedEntity : Interchange | void = metaEd.entity.interchange.get(interchangeExtension.metaEdName);
    if (!extendedEntity) return;
    failInterchangeExtensionPropertyRedeclarations(
      'InterchangeExtensionMustNotRedeclareBaseInterchangeElements', 'elements', interchangeExtension, extendedEntity, failures);
  });
  return failures;
}

