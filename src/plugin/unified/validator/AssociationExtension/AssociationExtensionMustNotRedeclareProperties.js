// @flow
import type { Association } from '../../../../core/model/Association';
import type { AssociationSubclass } from '../../../../core/model/AssociationSubclass';
import type { Repository } from '../../../../core/model/Repository';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import type { PropertyRepository } from '../../../../core/model/property/PropertyRepository';
import { failExtensionPropertyRedeclarations } from '../ValidatorShared/FailExtensionPropertyRedeclarations';

// eslint-disable-next-line no-unused-vars
export function validate(repository: Repository, propertyRepository?: PropertyRepository): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  repository.entity.associationExtension.forEach(associationExtension => {
    const extendedEntity : Association | AssociationSubclass | void =
      repository.entity.association.get(associationExtension.metaEdName) || repository.entity.associationSubclass.get(associationExtension.metaEdName);
    if (extendedEntity) {
      failExtensionPropertyRedeclarations('AssociationExtensionMustNotRedeclareProperties', associationExtension, extendedEntity, failures);
    }
  });
  return failures;
}
