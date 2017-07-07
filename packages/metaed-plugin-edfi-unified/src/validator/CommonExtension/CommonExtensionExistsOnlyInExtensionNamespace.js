// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.entity.commonExtension.forEach(entity => {
    if (!entity.namespaceInfo.isExtension) {
      failures.push({
        validatorName: 'CommonExtensionExistsOnlyInExtensionNamespace',
        category: 'error',
        message: `Common additions '${entity.metaEdName}' is not valid in core namespace '${entity.namespaceInfo.namespace}`,
        sourceMap: entity.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
