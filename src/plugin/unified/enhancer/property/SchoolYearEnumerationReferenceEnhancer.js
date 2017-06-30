// @flow
import type { MetaEdEnvironment } from '../../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../core/enhancer/EnhancerResult';

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
