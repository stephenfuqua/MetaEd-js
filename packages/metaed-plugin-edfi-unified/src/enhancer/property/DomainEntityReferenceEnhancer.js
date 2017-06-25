// @flow
import type { MetaEdEnvironment } from '../../../../../packages/metaed-core/src/MetaEdEnvironment';
import type { EnhancerResult } from '../../../../../packages/metaed-core/src/enhancer/EnhancerResult';

const enhancerName: string = 'DomainEntityReferenceEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.propertyIndex.domainEntity.forEach(property => {
    let referencedEntity = metaEd.entity.domainEntity.get(property.metaEdName);
    if (!referencedEntity) referencedEntity = metaEd.entity.domainEntitySubclass.get(property.metaEdName);

    if (referencedEntity) {
      property.referencedEntity = referencedEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
