// @flow
import type { MetaEdEnvironment } from '../../../core/MetaEdEnvironment';
import type { EnhancerResult } from '../../../core/enhancer/EnhancerResult';
import { getAll, getTopLevelEntity } from '../../../core/model/EntityRepository';
import { asDomainBase } from '../../../core/model/Domain';

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
