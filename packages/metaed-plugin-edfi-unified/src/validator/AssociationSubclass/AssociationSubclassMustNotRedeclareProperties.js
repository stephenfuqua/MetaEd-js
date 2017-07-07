// @flow
import type { Association, AssociationExtension, MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
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
