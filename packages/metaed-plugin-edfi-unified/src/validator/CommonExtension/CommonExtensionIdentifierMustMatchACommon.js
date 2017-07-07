// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.commonExtension.forEach(entity => {
    if (!metaEd.entity.common.has(entity.metaEdName)) {
      failures.push({
        validatorName: 'CommonExtensionIdentifierMustMatchACommon',
        category: 'error',
        message: `Common additions '${entity.metaEdName}' does not match any declared Common.`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
