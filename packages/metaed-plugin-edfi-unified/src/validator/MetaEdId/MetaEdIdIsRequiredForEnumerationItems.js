// @flow
import type { Enumeration, SchoolYearEnumeration, MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getEntitiesOfType, asEnumeration } from 'metaed-core';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getEntitiesOfType(metaEd.entity, 'enumeration', 'schoolYearEnumeration').forEach(entity => {
    const domain: Enumeration | SchoolYearEnumeration = asEnumeration(entity);
    if (domain.enumerationItems.length === 0) return;
    domain.enumerationItems.forEach(enumerationItem => {
      if (enumerationItem.metaEdId) return;
      failures.push({
        validatorName: 'MetaEdIdIsRequiredForEnumerationItems',
        category: 'warning',
        message: `${enumerationItem.typeHumanizedName} ${enumerationItem.metaEdName} is missing a MetaEdId value.`,
        sourceMap: enumerationItem.sourceMap.type,
        fileMap: null,
      });
    });
  });
  return failures;
}
