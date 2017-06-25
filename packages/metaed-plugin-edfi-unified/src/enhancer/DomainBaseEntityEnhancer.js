// @flow
import type { MetaEdEnvironment } from '../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../packages/metaed-core/src/enhancer/EnhancerResult';
import { getAll, getTopLevelEntity } from '../../../../packages/metaed-core/src/model/EntityRepository';
import { asDomainBase } from '../../../../packages/metaed-core/src/model/Domain';

const enhancerName: string = 'DomainBaseEntityEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  getAll(metaEd.entity, 'domain', 'subdomain').forEach(entity => {
    const domainBase = asDomainBase(entity);
    domainBase.domainItems.forEach(domainItem => {
      const referencedEntity = getTopLevelEntity(metaEd.entity, domainItem.metaEdName);
      if (referencedEntity) domainBase.entities.push(referencedEntity);
    });
  });

  return {
    enhancerName,
    success: true,
  };
}
