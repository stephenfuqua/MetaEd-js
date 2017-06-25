// @flow
import type { Association } from '../../../../../packages/metaed-core/src/model/Association';
import type { AssociationExtension } from '../../../../../packages/metaed-core/src/model/AssociationExtension';
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

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
