import { MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getEntitiesOfTypeForNamespaces } from 'metaed-core';
import { generateValidationErrorsForDuplicates } from '../ValidatorShared/ErrorsForDuplicateMetaEdNames';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.namespace.forEach((namespace: Namespace) => {
    failures.push(
      ...generateValidationErrorsForDuplicates(
        getEntitiesOfTypeForNamespaces([namespace], 'descriptor'),
        'DescriptorNamesMustBeUnique',
      ),
    );
  });

  return failures;
}
