// @flow
import type { EntityRepository, ModelType, ValidationFailure } from '../../../../../packages/metaed-core/index';

const validTypes: ModelType[] = [
  'association',
  'associationSubclass',
  'descriptor',
  'domainEntity',
  'domainEntitySubclass',
];

const validTypeNames: string = [
  'Abstract Entity',
  'Association',
  'Association Subclass',
  'Descriptor',
  'Domain Entity',
  'Domain Entity Subclass',
].join(', ');

export function failInterchangeItemNotMatchingBaseClassProperty(
  validatorName: string,
  entity: EntityRepository,
  interchangeItemType: 'elements' | 'identityTemplates',
  messagePrefix: string,
  failures: Array<ValidationFailure>) {
  entity.interchange.forEach(interchange => {
    if (interchange.elements.length === 0) return;
    // $FlowIgnore - allowing interchangeItemType to specify either elements or identityTemplates property
    interchange[interchangeItemType].forEach(item => {
      // $FlowIgnore - allowing type to specify the entityRepository Map property
      if (validTypes.some(type => entity[type].has(item.metaEdName))) return;
      failures.push({
        validatorName,
        category: 'error',
        message: `${messagePrefix} ${item.metaEdName} does not match any declared ${validTypeNames}`,
        sourceMap: item.sourceMap.metaEdName,
        fileMap: null,
      });
    });
  });
}
