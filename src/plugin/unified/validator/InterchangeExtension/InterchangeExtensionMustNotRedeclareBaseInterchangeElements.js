// @flow
import type { Interchange } from '../../../../core/model/Interchange';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
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

