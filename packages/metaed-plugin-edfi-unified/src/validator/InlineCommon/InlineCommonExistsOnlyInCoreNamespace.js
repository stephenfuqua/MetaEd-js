// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.entity.common.forEach(common => {
    if (!common.inlineInOds || !common.namespaceInfo.isExtension) return;
    failures.push({
      validatorName: 'InlineCommonExistsOnlyInCoreNamespace',
      category: 'error',
      message: `${common.typeHumanizedName} ${common.metaEdName} is not valid in extension namespace ${common.namespaceInfo.projectExtension} .`,
      sourceMap: common.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
