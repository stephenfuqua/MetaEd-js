// @flow
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../packages/metaed-core/src/enhancer/EnhancerResult';
import { getAllProperties } from '../../../../packages/metaed-core/src/model/property/PropertyRepository';

const enhancerName: string = 'PropertyPathNameEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllProperties(metaEd.propertyIndex).forEach(entityProperty => {
    entityProperty.propertyPathName = (entityProperty.withContext !== entityProperty.metaEdName ? entityProperty.withContext : '') + entityProperty.metaEdName;
  });

  return {
    enhancerName,
    success: true,
  };
}
