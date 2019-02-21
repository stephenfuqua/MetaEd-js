import { MetaEdEnvironment, EnhancerResult, getAllProperties } from 'metaed-core';

const enhancerName = 'FullPropertyNameEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllProperties(metaEd.propertyIndex).forEach(entityProperty => {
    entityProperty.fullPropertyName =
      (entityProperty.withContext !== entityProperty.metaEdName ? entityProperty.withContext : '') +
      entityProperty.metaEdName;
  });

  return {
    enhancerName,
    success: true,
  };
}
