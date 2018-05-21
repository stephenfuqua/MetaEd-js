// @flow
import type { MetaEdEnvironment, EnhancerResult, DomainEntitySubclass, TopLevelEntity } from 'metaed-core';
import { getAllEntitiesOfType, getEntityForNamespaces } from 'metaed-core';

const enhancerName: string = 'DomainEntitySubclassBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  ((getAllEntitiesOfType(metaEd, 'domainEntitySubclass'): any): Array<DomainEntitySubclass>).forEach(childEntity => {
    const baseEntity: ?TopLevelEntity = ((getEntityForNamespaces(
      childEntity.baseEntityName,
      [childEntity.namespace, ...childEntity.namespace.dependencies],
      'domainEntity',
      'domainEntitySubclass',
    ): any): ?TopLevelEntity);

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
