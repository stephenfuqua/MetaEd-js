// @flow
import type { Interchange } from '../../../../../packages/metaed-core/src/model/Interchange';
import type { InterchangeItem } from '../../../../../packages/metaed-core/src/model/InterchangeItem';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';
import { findDuplicates } from '../ValidatorShared/FindDuplicates';

export function failInterchangeItemRedeclarations(
  validatorName: string,
  duplicateItemName: string,
  entity: Interchange,
  interchangeItems: Array<InterchangeItem>,
  failures: Array<ValidationFailure>) {
  const itemNames: Array<string> = interchangeItems.map(x => x.metaEdName);
  const duplicates: Array<string> = findDuplicates(itemNames);

  duplicates.forEach(duplicate => {
    const interchangeItem: InterchangeItem | void = interchangeItems.find(x => x.metaEdName === duplicate);
    if (!interchangeItem) return;

    failures.push({
      validatorName,
      category: 'error',
      message: `Interchange ${entity.metaEdName} redeclares ${duplicateItemName} ${duplicate}.`,
      sourceMap: interchangeItem.sourceMap.metaEdName,
      fileMap: null,
    });
  });
}
