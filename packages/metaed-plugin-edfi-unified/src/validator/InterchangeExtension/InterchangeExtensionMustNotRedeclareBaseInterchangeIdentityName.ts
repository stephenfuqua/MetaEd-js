import { MetaEdEnvironment, ValidationFailure, Interchange, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';
import { failInterchangeExtensionPropertyRedeclarations } from '../ValidatorShared/FailInterchangeExtensionPropertyRedeclarations';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.namespace.forEach((namespace: Namespace) => {
    namespace.entity.interchangeExtension.forEach(interchangeExtension => {
      const extendedEntity: Interchange | null = getEntityForNamespaces(
        interchangeExtension.metaEdName,
        [...namespace.dependencies],
        'interchange',
      ) as Interchange | null;

      if (extendedEntity == null) return;
      failInterchangeExtensionPropertyRedeclarations(
        'InterchangeExtensionMustNotRedeclareBaseInterchangeIdentityName',
        'identityTemplates',
        interchangeExtension,
        extendedEntity,
        failures,
      );
    });
  });
  return failures;
}
