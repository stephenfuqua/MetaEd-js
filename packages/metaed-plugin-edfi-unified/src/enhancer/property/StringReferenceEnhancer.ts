import { EnhancerResult, MetaEdEnvironment, SharedStringProperty, SharedString } from 'metaed-core';
import { getEntityFromNamespaceChain } from 'metaed-core';

const enhancerName = 'StringReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedString.forEach((property: SharedStringProperty) => {
    const referencedEntity: SharedString | null = getEntityFromNamespaceChain(
      property.referencedType,
      property.referencedNamespaceName,
      property.namespace,
      'sharedString',
    ) as SharedString | null;

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
