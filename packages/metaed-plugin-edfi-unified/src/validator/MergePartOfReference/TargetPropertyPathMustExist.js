// @flow
import R from 'ramda';
import type { PropertyType, MetaEdEnvironment, ValidationFailure } from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';
import { failReferencedPropertyDoesNotExist } from '../ValidatorShared/FailReferencedPropertyDoesNotExist';

const validPropertyTypes: Array<PropertyType> = ['association', 'choice', 'common', 'domainEntity', 'inlineCommon'];

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  getPropertiesOfType(metaEd.propertyIndex, ...validPropertyTypes).forEach(property => {
    if (!property.mergedProperties) return;
    asReferentialProperty(property).mergedProperties.forEach(mergedProperty => {
      failReferencedPropertyDoesNotExist(
        'TargetPropertyPathMustExist',
        metaEd.entity,
        property.parentEntity,
        mergedProperty.targetPropertyPath,
        R.head(mergedProperty.mergePropertyPath),
        R.head(mergedProperty.sourceMap.targetPropertyPath),
        failures,
      );
    });
  });

  return failures;
}
