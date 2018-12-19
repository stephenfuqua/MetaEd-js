import { MetaEdEnvironment, EnhancerResult, Namespace, TopLevelEntity } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName = 'SchoolYearEnumerationReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.schoolYearEnumeration.forEach(property => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: TopLevelEntity | null = getEntityForNamespaces(
      property.metaEdName,
      namespaces,
      'schoolYearEnumeration',
    ) as TopLevelEntity | null;
    if (referencedEntity) property.referencedEntity = referencedEntity;
  });

  return {
    enhancerName,
    success: true,
  };
}
