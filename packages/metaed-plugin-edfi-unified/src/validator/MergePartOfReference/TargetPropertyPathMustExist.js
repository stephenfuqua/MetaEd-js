// @flow
import R from 'ramda';
import type { PropertyType, MetaEdEnvironment, ValidationFailure, Namespace } from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';
import { failReferencedPropertyDoesNotExist } from '../ValidatorShared/FailReferencedPropertyDoesNotExist';

const validPropertyTypes: Array<PropertyType> = [
  'association',
  'choice',
  'common',
  'descriptor',
  'domainEntity',
  'enumeration',
  'inlineCommon',
  'schoolYearEnumeration',
  'sharedDecimal',
  'sharedInteger',
  'sharedShort',
  'sharedString',
];

export function validate(metaEd: MetaEdEnvironment): Array<ValidationFailure> {
  const failures: Array<ValidationFailure> = [];

  getPropertiesOfType(metaEd.propertyIndex, ...validPropertyTypes).forEach(property => {
    // TODO: As of METAED-881, the current property here could also be one of the shared simple properties, which
    // are not currently extensions of ReferentialProperty but have an equivalent mergedProperties field
    const referentialProperty = asReferentialProperty(property);
    const namespaces: Array<Namespace> = [referentialProperty.namespace, ...referentialProperty.namespace.dependencies];
    referentialProperty.mergedProperties.forEach(mergedProperty => {
      failReferencedPropertyDoesNotExist(
        'TargetPropertyPathMustExist',
        namespaces,
        referentialProperty.parentEntity,
        mergedProperty.targetPropertyPath,
        R.head(mergedProperty.mergePropertyPath),
        R.head(mergedProperty.sourceMap.targetPropertyPath),
        failures,
      );
    });
  });

  return failures;
}
