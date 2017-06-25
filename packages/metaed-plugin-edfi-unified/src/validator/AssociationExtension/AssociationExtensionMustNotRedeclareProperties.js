// @flow
import type { Association } from '../../../../../packages/metaed-core/src/model/Association';
import type { AssociationSubclass } from '../../../../../packages/metaed-core/src/model/AssociationSubclass';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
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
