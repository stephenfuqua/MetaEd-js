import { MetaEdEnvironment, EnhancerResult, Interchange, InterchangeItem, Namespace } from 'metaed-core';
import { asTopLevelEntity, getEntityForNamespaces, getAllEntitiesOfType, asInterchange } from 'metaed-core';

const enhancerName = 'InterchangeBaseItemEnhancer';

function assignReference(namespaces: Array<Namespace>, item: InterchangeItem) {
  const referencedEntity = getEntityForNamespaces(item.metaEdName, namespaces, ...item.referencedType);
  if (referencedEntity) item.referencedEntity = asTopLevelEntity(referencedEntity);
}

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  (getAllEntitiesOfType(metaEd, 'interchange', 'interchangeExtension') as Array<Interchange>).forEach(interchangeBase => {
    const interchange: Interchange = asInterchange(interchangeBase);
    const namespaces: Array<Namespace> = [interchange.namespace, ...interchange.namespace.dependencies];
    interchange.elements.forEach(item => assignReference(namespaces, item));
    interchange.identityTemplates.forEach(item => assignReference(namespaces, item));
  });

  return {
    enhancerName,
    success: true,
  };
}
