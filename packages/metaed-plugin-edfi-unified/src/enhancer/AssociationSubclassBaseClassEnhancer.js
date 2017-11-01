// @flow
import type { MetaEdEnvironment, EnhancerResult } from 'metaed-core';

const enhancerName: string = 'AssociationSubclassBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.associationSubclass.forEach(childEntity => {
    let baseEntity = metaEd.entity.association.get(childEntity.baseEntityName);
    if (!baseEntity) baseEntity = metaEd.entity.associationSubclass.get(childEntity.baseEntityName);

    if (baseEntity) {
      childEntity.baseEntity = baseEntity;
    }
  });

  return {
    enhancerName,
    success: true,
  };
}
