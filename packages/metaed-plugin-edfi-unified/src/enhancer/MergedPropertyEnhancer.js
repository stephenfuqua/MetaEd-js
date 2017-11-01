// @flow
import R from 'ramda';
import type {
  EnhancerResult,
  MetaEdEnvironment,
  PropertyType,
  EntityProperty,
  TopLevelEntity,
} from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';

const enhancerName: string = 'MergedPropertyEnhancer';

const referenceTypes: Array<PropertyType> = [
  'association',
  'choice',
  'common',
  'descriptor',
  'domainEntity',
  'enumeration',
  'inlineCommon',
  'schoolYearEnumeration',
];

function findProperty(entity: TopLevelEntity, paths: Array<string>): ?EntityProperty {
  const propertyName:string = paths.pop();
  const property: ?EntityProperty = entity.properties.find(x => x.propertyPathName === propertyName);
  if (!property || R.isEmpty(paths)) return property;
  return findProperty(asReferentialProperty(property).referencedEntity, paths);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getPropertiesOfType(metaEd.propertyIndex, ...referenceTypes)
    .map(x => asReferentialProperty(x))
    .filter(x => !R.isEmpty(x.mergedProperties))
    .forEach(property => {
      property.mergedProperties.forEach(mergedProperty => {
        mergedProperty.mergeProperty = findProperty(property.parentEntity, R.reverse(mergedProperty.mergePropertyPath));
        mergedProperty.targetProperty = findProperty(property.parentEntity, R.reverse(mergedProperty.targetPropertyPath));
      });
    });

  return {
    enhancerName,
    success: true,
  };
}

