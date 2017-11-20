// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';
import { getEntitiesOfType, getTopLevelCoreEntity, asDomainBase } from 'metaed-core';

const enhancerName: string = 'DomainBaseEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getEntitiesOfType(metaEd.entity, 'domain', 'subdomain').forEach(entity => {
    const domainBase = asDomainBase(entity);
    domainBase.domainItems.forEach(domainItem => {
      const referencedEntity = getTopLevelCoreEntity(metaEd.entity, domainItem.metaEdName);
      if (referencedEntity) domainBase.entities.push(referencedEntity);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
