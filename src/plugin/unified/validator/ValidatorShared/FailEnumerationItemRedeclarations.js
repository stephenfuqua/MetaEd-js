// @flow
import type { Descriptor } from '../../../../core/model/Descriptor';
import type { Enumeration } from '../../../../core/model/Enumeration';
import type { EnumerationItem } from '../../../../core/model/EnumerationItem';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { findDuplicates } from '../ValidatorShared/FindDuplicates';

export function failEnumerationItemRedeclarations(
  validatorName: string,
  entity: Descriptor | Enumeration,
  enumerationItems: Array<EnumerationItem>,
  failures: Array<ValidationFailure>) {
  const shortDescriptions: Array<string> = enumerationItems.map(x => x.shortDescription);
  const duplicates: Array<string> = findDuplicates(shortDescriptions);

  duplicates.forEach(duplicate => {
    const enumerationItem = enumerationItems.find(x => x.shortDescription === duplicate);
    if (enumerationItem == null) return;

    failures.push({
      validatorName,
      category: 'error',
      message: `${entity.typeHumanizedName} ${entity.metaEdName} redeclares item ${duplicate}.`,
      sourceMap: enumerationItem.sourceMap.type,
      fileMap: null,
    });
  });
}
