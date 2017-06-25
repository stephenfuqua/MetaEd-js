// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.interchangeExtension.forEach(interchangeExtension => {
    if (metaEd.entity.interchange.has(interchangeExtension.metaEdName)) return;
    failures.push({
      validatorName: 'InterchangeExtensionIdentifierMustMatchAnInterchange',
      category: 'error',
      message: `Interchange additions ${interchangeExtension.metaEdName} does not match any declared Interchange.`,
      sourceMap: interchangeExtension.sourceMap.metaEdName,
      fileMap: null,
    });
  });

  return failures;
}
