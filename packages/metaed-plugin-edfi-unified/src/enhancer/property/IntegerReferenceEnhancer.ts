import { EnhancerResult, MetaEdEnvironment, SharedIntegerProperty, SharedInteger } from 'metaed-core';
import { getEntityFromNamespaceChain } from 'metaed-core';

const enhancerName = 'IntegerReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedInteger.forEach((property: SharedIntegerProperty) => {
    const referencedEntity: SharedInteger | null = getEntityFromNamespaceChain(
      property.referencedType,
      property.referencedNamespaceName,
      property.namespace,
      'sharedInteger',
    ) as SharedInteger | null;

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
      property.referencedEntityDeprecated = referencedEntity.isDeprecated;
      referencedEntity.inReferences.push(property);
      property.parentEntity.outReferences.push(property);
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
