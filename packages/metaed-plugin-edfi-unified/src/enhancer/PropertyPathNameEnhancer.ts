import { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllProperties } from 'metaed-core';

const enhancerName = 'PropertyPathNameEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllProperties(metaEd.propertyIndex).forEach(entityProperty => {
    entityProperty.propertyPathName =
      (entityProperty.withContext !== entityProperty.metaEdName ? entityProperty.withContext : '') +
      entityProperty.metaEdName;
  });

  return {
    enhancerName,
    success: true,
  };
}
