// @flow
import type { MetaEdEnvironment, EnhancerResult } from '../../../../packages/metaed-core/index';

const enhancerName: string = 'AssociationExtensionBaseClassEnhancer';

export function enhance(metaEd: MetaEdEnvironment): EnhancerResult {
  metaEd.entity.associationExtension.forEach(childEntity => {
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
