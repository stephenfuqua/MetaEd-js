// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';

const enhancerName: string = 'DomainEntitySubclassBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.domainEntitySubclass.forEach(childEntity => {
    let baseEntity = metaEd.entity.domainEntity.get(childEntity.baseEntityName);
    if (!baseEntity) baseEntity = metaEd.entity.domainEntitySubclass.get(childEntity.baseEntityName);

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
