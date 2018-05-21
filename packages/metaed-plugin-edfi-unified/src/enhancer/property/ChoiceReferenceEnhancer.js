// @flow
import type { MetaEdEnvironment, EnhancerResult, Namespace, TopLevelEntity } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'ChoiceReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.choice.forEach(property => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: ?TopLevelEntity = ((getEntityForNamespaces(
      property.metaEdName,
      namespaces,
      'choice',
    ): any): ?TopLevelEntity);

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
