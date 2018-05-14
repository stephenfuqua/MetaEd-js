// @flow
import type { MetaEdEnvironment, EnhancerResult, Namespace } from 'metaed-core';
import { getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'CommonReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.common.forEach(property => {
    const namespaces: Array<Namespace> = [property.namespace, ...property.namespace.dependencies];
    const referencedEntity: ?ModelBase = getEntityForNamespaces(property.metaEdName, namespaces, 'common');

    if (referencedEntity && !referencedEntity.inlineInOds) {
      property.referencedEntity = referencedEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
