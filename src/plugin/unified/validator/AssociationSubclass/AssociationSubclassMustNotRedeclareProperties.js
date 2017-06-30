// @flow
import type { Association } from '../../../../core/model/Association';
import type { AssociationExtension } from '../../../../core/model/AssociationExtension';
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.associationSubclass.forEach(associationSubclass => {
    const extendedEntity: Association | AssociationExtension | void =
      metaEd.entity.association.get(associationSubclass.baseEntityName) || metaEd.entity.associationExtension.get(associationSubclass.baseEntityName);
    if (!extendedEntity) return;
    failExtensionPropertyRedeclarations('AssociationSubClassMustNotRedeclareProperties', associationSubclass, extendedEntity, failures);
  });

  return failures;
}
