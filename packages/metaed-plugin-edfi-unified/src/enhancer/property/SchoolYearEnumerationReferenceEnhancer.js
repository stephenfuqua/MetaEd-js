// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../../packages/metaed-core/index';

const enhancerName: string = 'SchoolYearEnumerationReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.schoolYearEnumeration.forEach(property => {
    const referencedEntity = metaEd.entity.schoolYearEnumeration.get(property.metaEdName);
    if (referencedEntity) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
