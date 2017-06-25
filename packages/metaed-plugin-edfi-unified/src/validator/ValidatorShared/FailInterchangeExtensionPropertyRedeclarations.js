// @flow
import type { Interchange } from '../../../../../packages/metaed-core/src/model/Interchange';
import type { ValidationFailure } from '../../../../../packages/metaed-core/src/validator/ValidationFailure';

export function failInterchangeExtensionPropertyRedeclarations(
  validatorName: string,
  interchangeItemType: 'elements' | 'identityTemplates',
  extensionEntity: Interchange,
  baseEntity: Interchange,
  failures: Array<ValidationFailure>) {
  // $FlowIgnore - allowing interchangeItemType to specify either elements or identityTemplates property
  extensionEntity[interchangeItemType].forEach(extensionItem => {
    // $FlowIgnore - allowing interchangeItemType to specify either elements or identityTemplates property
    baseEntity[interchangeItemType].forEach(baseItem => {
      if (extensionItem.metaEdName !== baseItem.metaEdName) return;
      failures.push({
        validatorName,
        category: 'error',
        message: `Interchange additions ${extensionEntity.metaEdName} redeclares property ${extensionItem.metaEdName} of base Interchange.`,
        sourceMap: extensionItem.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
}
