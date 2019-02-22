import R from 'ramda';
import { EnhancerResult, MetaEdEnvironment, PropertyType, EntityProperty, TopLevelEntity } from 'metaed-core';
import { getPropertiesOfType, asReferentialProperty } from 'metaed-core';

const enhancerName = 'MergeDirectiveEnhancer';

const referenceTypes: Array<PropertyType> = [
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

function findProperty(entity: TopLevelEntity, paths: Array<string>): EntityProperty | null {
  const propertyName: string | undefined = paths.pop();
  if (propertyName == null) return null;
  const property: EntityProperty | undefined = entity.properties.find(x => x.fullPropertyName === propertyName);
  if (property == null) return null;
  // Shared simple properties are legal - they should always be a path leaf, ending search here
  if (paths.length === 0) return property;
  return findProperty(asReferentialProperty(property).referencedEntity, paths);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getPropertiesOfType(metaEd.propertyIndex, ...referenceTypes)
    // TODO: As of METAED-881, the current property here could also be one of the shared simple properties, which
    // are not currently extensions of ReferentialProperty but have an equivalent mergeDirectives field
    .map(x => asReferentialProperty(x))
    .filter(x => !R.isEmpty(x.mergeDirectives))
    .forEach(property => {
      property.mergeDirectives.forEach(mergeDirective => {
        mergeDirective.sourceProperty = findProperty(
          property.parentEntity,
          R.reverse(mergeDirective.sourcePropertyPathStrings),
        );
        mergeDirective.targetProperty = findProperty(
          property.parentEntity,
          R.reverse(mergeDirective.targetPropertyPathStrings),
        );
        if (mergeDirective.sourceProperty) mergeDirective.sourceProperty.mergeSourcedBy.push(property);
        if (mergeDirective.targetProperty) mergeDirective.targetProperty.mergeTargetedBy.push(property);
      });
    });

  return {
    enhancerName,
    success: true,
  };
}
