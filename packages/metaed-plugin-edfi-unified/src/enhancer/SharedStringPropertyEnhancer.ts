import { MetaEdEnvironment, EnhancerResult, SharedString } from 'metaed-core';
import { NoSharedSimple } from 'metaed-core';

const enhancerName = 'SharedStringPropertyEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedString.forEach(property => {
    if (property.referencedEntity === NoSharedSimple) return;

    const referencedEntity = property.referencedEntity as SharedString;
    property.minLength = referencedEntity.minLength;
    property.maxLength = referencedEntity.maxLength;
  });

  return {
    enhancerName,
    success: true,
  };
}
