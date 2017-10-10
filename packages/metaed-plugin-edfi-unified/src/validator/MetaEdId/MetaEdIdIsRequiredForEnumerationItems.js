// @flow
import type { Enumeration, MapTypeEnumeration, SchoolYearEnumeration, MetaEdEnvironment, ValidationFailure } from '../../../../metaed-core/index';
import { getEntitiesOfType } from '../../../../metaed-core/index';
import { asEnumeration } from '../../../../metaed-core/src/model/Enumeration';

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];
  getEntitiesOfType(metaEd.entity, 'enumeration', 'mapTypeEnumeration', 'schoolYearEnumeration').forEach(entity => {
    const domain: Enumeration | MapTypeEnumeration | SchoolYearEnumeration = asEnumeration(entity);
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
