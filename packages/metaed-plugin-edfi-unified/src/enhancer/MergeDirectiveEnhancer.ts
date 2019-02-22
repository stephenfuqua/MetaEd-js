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

function findProperty(
  entity: TopLevelEntity,
  pathStrings: Array<string>,
  propertyChainAccumulator: Array<EntityProperty>,
): EntityProperty | null {
  const propertyName: string | undefined = pathStrings.pop();
  if (propertyName == null) return null;
  const property: EntityProperty | undefined = entity.properties.find(x => x.fullPropertyName === propertyName);
  if (property == null) return null;
  propertyChainAccumulator.push(property);
  // Shared simple properties are legal - they should always be a path leaf, ending search here
  if (pathStrings.length === 0) return property;

  // TODO: Reference navigation should include Extension entities with the same base entity as the property's referenced entity
  return findProperty(asReferentialProperty(property).referencedEntity, pathStrings, propertyChainAccumulator);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getPropertiesOfType(metaEd.propertyIndex, ...referenceTypes)
    // TODO: As of METAED-881, the current property here could also be one of the shared simple properties, which
    // are not currently extensions of ReferentialProperty but have an equivalent mergeDirectives field
    .map(x => asReferentialProperty(x))
    .filter(x => !R.isEmpty(x.mergeDirectives))
    .forEach(property => {
      const sourcePropertyChain: Array<EntityProperty> = [];
      const targetPropertyChain: Array<EntityProperty> = [];

      property.mergeDirectives.forEach(mergeDirective => {
        mergeDirective.sourceProperty = findProperty(
          property.parentEntity,
          R.reverse(mergeDirective.sourcePropertyPathStrings),
          sourcePropertyChain,
        );
        mergeDirective.sourcePropertyChain = sourcePropertyChain;
        if (mergeDirective.sourceProperty) mergeDirective.sourceProperty.mergeSourcedBy.push(property);

        mergeDirective.targetProperty = findProperty(
          property.parentEntity,
          R.reverse(mergeDirective.targetPropertyPathStrings),
          targetPropertyChain,
        );
        mergeDirective.targetPropertyChain = targetPropertyChain;
        if (mergeDirective.targetProperty) mergeDirective.targetProperty.mergeTargetedBy.push(property);
      });
    });

  return {
    enhancerName,
    success: true,
  };
}
