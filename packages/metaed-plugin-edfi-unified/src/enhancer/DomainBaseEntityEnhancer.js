// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';
import { getEntitiesOfType, getTopLevelCoreEntity } from '../../../../packages/metaed-core/index';
import { asDomainBase } from '../../../../packages/metaed-core/src/model/Domain';

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
