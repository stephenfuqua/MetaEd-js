import { MetaEdEnvironment, EnhancerResult, SharedInteger } from 'metaed-core';
import { NoSharedSimple } from 'metaed-core';

const enhancerName = 'SharedIntegerPropertyEnhancer';

function copyRestrictions(property) {
  const referencedEntity = property.referencedEntity as SharedInteger;
  property.minValue = referencedEntity.minValue;
  property.maxValue = referencedEntity.maxValue;
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedInteger.forEach(property => {
    if (property.referencedEntity === NoSharedSimple) return;
    copyRestrictions(property);
  });

  metaEd.propertyIndex.sharedShort.forEach(property => {
    if (property.referencedEntity === NoSharedSimple) return;
    copyRestrictions(property);
  });

  return {
    enhancerName,
    success: true,
  };
}
