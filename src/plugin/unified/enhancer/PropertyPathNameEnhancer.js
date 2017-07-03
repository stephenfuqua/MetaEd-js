// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import { getAllProperties } from '../../../core/model/property/PropertyRepository';

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
