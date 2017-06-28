// @flow
import type { Descriptor } from '../../../../core/model/Descriptor';
import type { Enumeration } from '../../../../core/model/Enumeration';
import type { EnumerationItem } from '../../../../core/model/EnumerationItem';
import type { ValidationFailure } from '../../../../core/validator/ValidationFailure';
import { findDuplicates } from '../ValidatorShared/FindDuplicates';

function getShortDescriptions(enumerationItems: Array<EnumerationItem>): Array<string> {
  return enumerationItems.map(x => x.shortDescription);
}

export function failEnumerationItemDuplicates(
  validatorName: string,
  entity: Descriptor | Enumeration,
  enumerationItems: Array<EnumerationItem>,
  failures: Array<ValidationFailure>) {
  const duplicates: Array<string> = findDuplicates(getShortDescriptions(enumerationItems));
  if (duplicates.length > 0) {
    failures.push({
      validatorName,
      category: 'error',
      message: `${entity.typeHumanizedName} ${entity.metaEdName} declares duplicate item${duplicates.length > 1 ? 's' : ''} ${duplicates.join(', ')}. `,
      // TODO: update with correct source map once merged
      sourceMap: entity.sourceMap.type,
      fileMap: null,
    });
  }
}
