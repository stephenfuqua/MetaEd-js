// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.common.forEach(property => {
    if (metaEd.entity.common.get(property.metaEdName) == null) {
      failures.push({
        validatorName: 'CommonPropertyMustMatchACommon',
        category: 'error',
        message: `Common property '${property.metaEdName}' does not match any declared Common.`,
        sourceMap: property.sourceMap.type,
        fileMap: null,
      });
    }
  });

  return failures;
}
