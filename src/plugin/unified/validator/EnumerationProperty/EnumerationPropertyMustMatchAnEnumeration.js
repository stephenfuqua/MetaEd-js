// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  metaEd.propertyIndex.enumeration.forEach(enumerationProperty => {
    if (metaEd.entity.enumeration.has(enumerationProperty.metaEdName)) return;
    failures.push({
      validatorName: 'EnumerationPropertyMustMatchAEnumeration',
      category: 'error',
      message: `Enumeration property ${enumerationProperty.metaEdName} does not match any declared enumeration.`,
      sourceMap: enumerationProperty.sourceMap.type,
      fileMap: null,
    });
  });
  return failures;
}
