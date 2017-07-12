// @flow
import type { ModelType, PropertyType, MetaEdEnvironment, ValidationFailure, SourceMap } from '../../../../../packages/metaed-core/index';
import { getPropertiesOfType } from '../../../../../packages/metaed-core/index';
import { asReferentialProperty } from '../../../../metaed-core/src/model/property/ReferentialProperty';
import { getEntity } from '../../../../metaed-core/src/model/EntityRepository';
import { asTopLevelEntity } from '../../../../metaed-core/src/model/TopLevelEntity';

const validPropertyTypes: Array<PropertyType> = [
  'common',
  'inlineCommon',
  'choice',
  'association',
  'domainEntity',
];

const validModelTypes: Array<ModelType> = [
  'common',
  'association',
  'associationSubclass',
  'domainEntity',
  'domainEntitySubclass',
  'descriptor',
  'enumeration',
];

function getFailure(failureMessage: string, sourceMap: SourceMap): ValidationFailure {
  return {
    validatorName: 'MergePropertyPathMustExist',
    category: 'error',
    message: failureMessage,
    sourceMap,
    fileMap: null,
  };
}

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  getPropertiesOfType(metaEd.propertyIndex, ...validPropertyTypes).forEach(property => {
    if (!property.mergedProperties) return;
    asReferentialProperty(property).mergedProperties.forEach(mergedProperty => {
      let entity = null;
      const mergePropertyLength = mergedProperty.mergePropertyPath.length;
      for (let i = 0; i < mergePropertyLength - 1; i += 1) {
        const entityName = mergedProperty.mergePropertyPath[i];
        entity = getEntity(metaEd.entity, entityName, ...validModelTypes);
        if (entity == null) {
          failures.push(getFailure(
            `Merge statement property path ${mergedProperty.mergePropertyPath.join('.')} must be a valid path. No Entity ${entityName} was found`,
            mergedProperty.sourceMap.mergePropertyPath[0]));
          return;
        }
      }

      if (entity != null) {
        const propertyName = mergedProperty.mergePropertyPath[mergePropertyLength - 1];
        const foundProperty = asTopLevelEntity(entity).properties.find(prop => prop.metaEdName === propertyName);
        if (foundProperty == null) {
          failures.push(getFailure(
            `Merge statement property path ${mergedProperty.mergePropertyPath.join('.')} must be a valid path. No Property ${propertyName} was found`,
            mergedProperty.sourceMap.mergePropertyPath[0]));
        }
      }
    });
  });

  return failures;
}
