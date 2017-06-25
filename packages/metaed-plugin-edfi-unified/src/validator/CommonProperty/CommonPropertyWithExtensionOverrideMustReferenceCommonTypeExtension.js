// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { CommonPropertySourceMap } from '../../../../../packages/metaed-core/src/model/property/CommonProperty';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.common.forEach(common => {
    if (!common.isExtensionOverride || (common.isExtensionOverride && metaEd.entity.commonExtension.has(common.metaEdName))) return;
    failures.push({
      validatorName: 'CommonPropertyWIthExtensionOverrideMustReferenceCommonTypeExtension',
      category: 'error',
      message: `'common extension' is invalid for property ${common.metaEdName} on ${common.parentEntity.typeHumanizedName} ${common.parentEntity.metaEdName}. 'common extension' is only valid for referencing Common extensions.`,
      sourceMap: ((common.sourceMap: any): CommonPropertySourceMap).isExtensionOverride,
      fileMap: null,
    });
  });
  return failures;
}
