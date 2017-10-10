// @flow
import R from 'ramda';
import type {
  PropertyType,
  MetaEdEnvironment,
  ValidationFailure,
} from '../../../../metaed-core/index';
import { getPropertiesOfType } from '../../../../metaed-core/index';
import { asReferentialProperty } from '../../../../metaed-core/src/model/property/ReferentialProperty';
import { failReferencedPropertyDoesNotExist } from '../ValidatorShared/FailReferencedPropertyDoesNotExist';

const validPropertyTypes: Array<PropertyType> = [
  'association',
  'choice',
  'common',
  'domainEntity',
  'inlineCommon',
];

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  getPropertiesOfType(metaEd.propertyIndex, ...validPropertyTypes).forEach(property => {
    if (!property.mergedProperties) return;
    asReferentialProperty(property).mergedProperties.forEach(mergedProperty => {
      failReferencedPropertyDoesNotExist(
        'MergePropertyPathMustExist',
        metaEd.entity,
        property.parentEntity,
        mergedProperty.mergePropertyPath,
        R.head(mergedProperty.targetPropertyPath),
        R.head(mergedProperty.sourceMap.mergePropertyPath),
        failures,
      );
    });
  });

  return failures;
}
