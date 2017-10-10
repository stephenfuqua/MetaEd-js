// @flow
import type { Association, AssociationSubclass, MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.associationExtension.forEach(associationExtension => {
    const extendedEntity : Association | AssociationSubclass | void =
      metaEd.entity.association.get(associationExtension.metaEdName) || metaEd.entity.associationSubclass.get(associationExtension.metaEdName);
    if (extendedEntity) {
      failExtensionPropertyRedeclarations('AssociationExtensionMustNotRedeclareProperties', associationExtension, extendedEntity, failures);
    }
  });
  return failures;
}
