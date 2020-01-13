import { EnhancerResult, MetaEdEnvironment, SharedDecimalProperty, SharedDecimal } from 'metaed-core';
import { getEntityFromNamespaceChain } from 'metaed-core';

const enhancerName = 'DecimalReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.sharedDecimal.forEach((property: SharedDecimalProperty) => {
    const referencedEntity: SharedDecimal | null = getEntityFromNamespaceChain(
      property.referencedType,
      property.referencedNamespaceName,
      property.namespace,
      'sharedDecimal',
    ) as SharedDecimal | null;

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
