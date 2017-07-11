// @flow
import type { MetaEdEnvironment, ValidationFailure } from '../../../../../packages/metaed-core/index';
import { getAllProperties } from '../../../../../packages/metaed-core/index';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getAllProperties(metaEd.propertyIndex).forEach(property => {
    if (property.metaEdId) return;
    failures.push({
      validatorName: 'MetaEdIdIsRequiredForProperties',
      category: 'warning',
      message: `${property.typeHumanizedName} ${property.metaEdName} on ${property.parentEntity.typeHumanizedName} ${property.parentEntity.metaEdName} is missing a MetaEdId value.`,
      sourceMap: property.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
