// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  metaEd.propertyIndex.common.forEach(common => {
    if (!common.isPartOfIdentity) return;
    failures.push({
      validatorName: 'CommonPropertyMustNotContainIdentity',
      category: 'error',
      message: `Common property ${common.metaEdName} is invalid to be used for the identity of ${common.parentEntity.typeHumanizedName} ${common.parentEntityName}.`,
      sourceMap: common.sourceMap.isPartOfIdentity,
      fileMap: null,
    });
  });
  return failures;
}
