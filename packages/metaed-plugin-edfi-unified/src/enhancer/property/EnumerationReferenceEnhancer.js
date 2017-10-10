// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../metaed-core/index';

const enhancerName: string = 'EnumerationReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.enumeration.forEach(property => {
    const referencedEntity = metaEd.entity.enumeration.get(property.metaEdName);
    if (referencedEntity) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
