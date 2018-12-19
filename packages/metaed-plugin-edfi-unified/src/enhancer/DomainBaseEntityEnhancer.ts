import { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getAllEntitiesOfType, getTopLevelCoreEntityForNamespaces, asDomainBase } from 'metaed-core';

const enhancerName = 'DomainBaseEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAllEntitiesOfType(metaEd, 'domain', 'subdomain').forEach(entity => {
    const domainBase = asDomainBase(entity);
    domainBase.domainItems.forEach(domainItem => {
      const referencedEntity = getTopLevelCoreEntityForNamespaces(
        [domainBase.namespace, ...domainBase.namespace.dependencies],
        domainItem.metaEdName,
      );
      if (referencedEntity) domainBase.entities.push(referencedEntity);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
